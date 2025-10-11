 import { useCallback, useMemo } from 'react';
import {
    clearAnswerError,
    clearCurrentSession,
    clearTestSessionError,
    deleteLocalAnswer,
    endExamSessionThunk,
    getExamSessionThunk,
    getStudentExamSessionsThunk,
    startExamSessionThunk,
    updateLocalAnswer
} from '../store/slices/testSessionSlice.ts';
import { StudentExamSessionRequest, SubmitAnswerItem, UpdateAnswerRequest } from '../types/testSession.ts';
import { useOlympiadDispatch, useOlympiadSelector } from './useOlympiadStore.ts';

const useTestSessionManager = () => {
    const dispatch = useOlympiadDispatch();
    const {
        currentSession,
        sessions,
        loading,
        error,
        answerUpdating,
        answerError,
        localAnswers
    } = useOlympiadSelector(state => state.testSession);

    // Start a new exam session
    const startExamSession = useCallback((examTestId: number) => {
        const request: StudentExamSessionRequest = { examTestId };
        return dispatch(startExamSessionThunk(request));
    }, [dispatch]);

    // End the current exam session with all collected answers
    const endExamSession = useCallback((sessionId: number) => {
        // Convert localAnswers object to array of SubmitAnswerItem
        const answers: SubmitAnswerItem[] = Object.entries(localAnswers).map(([questionId, selectedOptionId]) => ({
            questionId: parseInt(questionId),
            selectedOptionId
        }));
        
        return dispatch(endExamSessionThunk({ 
            sessionId,
            answers
        }));
    }, [dispatch, localAnswers]);

    // Get a specific exam session
    const getExamSession = useCallback((sessionId: number) => {
        return dispatch(getExamSessionThunk(sessionId));
    }, [dispatch]);

    // Get all sessions for the current student
    const getStudentSessions = useCallback(() => {
        return dispatch(getStudentExamSessionsThunk());
    }, [dispatch]);

    // Update an answer locally (no API call)
    const updateAnswer = useCallback((sessionId: number, questionId: number, selectedOptionId: number) => {
        const request: UpdateAnswerRequest = {
            studentExamSessionId: sessionId,
            questionId,
            selectedOptionId
        };
        return dispatch(updateLocalAnswer(request));
    }, [dispatch]);

    // Delete an answer locally (no API call)
    const deleteAnswer = useCallback((sessionId: number, questionId: number) => {
        return dispatch(deleteLocalAnswer({ questionId }));
    }, [dispatch]);

    // Clear the current session from state
    const clearSession = useCallback(() => {
        dispatch(clearCurrentSession());
    }, [dispatch]);

    // Clear errors
    const clearErrors = useCallback(() => {
        dispatch(clearTestSessionError());
        dispatch(clearAnswerError());
    }, [dispatch]);

    // Calculate if the exam is still active
    const isExamActive = useCallback(() => {
        if (!currentSession) return false;

        const endTimeDate = new Date(currentSession.endTime);
        const now = new Date();

        return !currentSession.endTime || endTimeDate > now;
    }, [currentSession]);

    // Calculate remaining time in seconds
    const getRemainingTime = useCallback(() => {
        if (!currentSession || !currentSession.endTime) return 0;

        const endTimeDate = new Date(currentSession.endTime);
        const now = new Date();

        const remainingMs = endTimeDate.getTime() - now.getTime();
        return Math.max(0, Math.floor(remainingMs / 1000)); // in seconds
    }, [currentSession]);

    // Get the answers (combining server answers with local changes)
    const getAnswers = useMemo(() => {
        if (!currentSession) return [];

        // Start with server answers
        const serverAnswers = currentSession.examData.studentAnswer || [];
        
        // Create a map for quick lookup
        const answerMap = new Map();
        
        // First add all server answers to the map
        serverAnswers.forEach(answer => {
            answerMap.set(answer.questionId, answer.selectedOptionId);
        });
        
        // Then override with local answers
        Object.entries(localAnswers).forEach(([questionId, selectedOptionId]) => {
            answerMap.set(parseInt(questionId), selectedOptionId);
        });
        
        // Convert the map back to an array format like the server data
        return Array.from(answerMap).map(([questionId, selectedOptionId]) => ({
            questionId,
            selectedOptionId
        }));
    }, [currentSession, localAnswers]);
    
    // Get selected option for a question, checking both server and local answers
    const getSelectedOptionForQuestion = useCallback((questionId: number) => {
        // First check local answers - they take precedence
        if (questionId in localAnswers) {
            return localAnswers[questionId];
        }
        
        // If not in local, check server answers
        if (currentSession && currentSession.examData.studentAnswer) {
            const serverAnswer = currentSession.examData.studentAnswer.find(
                answer => answer.questionId === questionId
            );
            if (serverAnswer) {
                return serverAnswer.selectedOptionId;
            }
        }
        
        return null;
    }, [currentSession, localAnswers]);

    return {
        // State
        currentSession,
        sessions,
        loading,
        error,
        answerUpdating,
        answerError,
        
        // Derived state
        answers: getAnswers,

        // Actions
        startExamSession,
        endExamSession,
        getExamSession,
        getStudentSessions,
        updateAnswer,
        deleteAnswer,
        clearSession,
        clearErrors,

        // Helper functions
        isExamActive,
        getRemainingTime,
        getSelectedOptionForQuestion
    };
};

export default useTestSessionManager;
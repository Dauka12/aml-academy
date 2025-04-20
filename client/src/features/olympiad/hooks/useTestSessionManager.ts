import { useCallback } from 'react';
import {
    clearAnswerError,
    clearCurrentSession,
    clearTestSessionError,
    deleteAnswerThunk,
    endExamSessionThunk,
    getExamSessionThunk,
    getStudentExamSessionsThunk,
    startExamSessionThunk,
    updateAnswerThunk
} from '../store/slices/testSessionSlice.ts';
import { StudentExamSessionRequest, UpdateAnswerRequest } from '../types/testSession.ts';
import { useOlympiadDispatch, useOlympiadSelector } from './useOlympiadStore.ts';

const useTestSessionManager = () => {
    const dispatch = useOlympiadDispatch();
    const {
        currentSession,
        sessions,
        loading,
        error,
        answerUpdating,
        answerError
    } = useOlympiadSelector(state => state.testSession);

    // Start a new exam session
    const startExamSession = useCallback((examTestId: number) => {
        const request: StudentExamSessionRequest = { examTestId };
        return dispatch(startExamSessionThunk(request));
    }, [dispatch]);

    // End the current exam session
    const endExamSession = useCallback((sessionId: number) => {
        return dispatch(endExamSessionThunk(sessionId));
    }, [dispatch]);

    // Get a specific exam session
    const getExamSession = useCallback((sessionId: number) => {
        return dispatch(getExamSessionThunk(sessionId));
    }, [dispatch]);

    // Get all sessions for the current student
    const getStudentSessions = useCallback(() => {
        return dispatch(getStudentExamSessionsThunk());
    }, [dispatch]);

    // Update an answer during an active exam
    const updateAnswer = useCallback((sessionId: number, questionId: number, selectedOptionId: number) => {
        const request: UpdateAnswerRequest = {
            studentExamSessionId: sessionId,
            questionId,
            selectedOptionId
        };
        return dispatch(updateAnswerThunk(request));
    }, [dispatch]);

    // Delete an answer during an active exam
    const deleteAnswer = useCallback((sessionId: number, questionId: number, selectedOptionId: number = 0) => {
        const request: UpdateAnswerRequest = {
            studentExamSessionId: sessionId,
            questionId,
            selectedOptionId
        };
        return dispatch(deleteAnswerThunk(request));
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

        // Convert both times to UTC for comparison
        const endTimeDate = new Date(currentSession.endTime);
        const now = new Date();

        console.log('---- Exam Active Status Check ----');
        console.log('Current time (UTC):', now.toISOString());
        console.log('Current time (local):', now.toString());
        console.log('Browser timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
        console.log('Current timezone offset:', now.getTimezoneOffset() / -60, 'hours');
        console.log('Session end time (UTC):', endTimeDate.toISOString());
        console.log('Session end time (local):', endTimeDate.toString());
        console.log('Is exam still active:', !currentSession.endTime || endTimeDate > now);
        
        // Direct UTC timestamp comparison - both are in UTC
        return !currentSession.endTime || endTimeDate.getTime() > now.getTime();
    }, [currentSession]);

    // Calculate remaining time in seconds based on actual test duration
    const getRemainingTime = useCallback(() => {
        if (!currentSession || !currentSession.endTime) return 0;

        // Get expected duration from test metadata (if available)
        const expectedDurationMinutes = currentSession.examData?.durationMinutes || 100; // Default to 100 minutes if not specified
        
        // Calculate actual duration using timestamps
        const startTimeMs = new Date(currentSession.startTime).getTime();
        const endTimeMs = new Date(currentSession.endTime).getTime();
        const actualDurationMs = endTimeMs - startTimeMs;
        const actualDurationMinutes = Math.floor(actualDurationMs / (60 * 1000));
        
        // Get current time
        const nowMs = new Date().getTime();
        
        // Calculate elapsed and remaining time
        const elapsedMs = nowMs - startTimeMs;
        const elapsedMinutes = Math.floor(elapsedMs / (60 * 1000));
        
        // Use expected duration rather than actual duration from server
        const remainingMinutes = Math.max(0, expectedDurationMinutes - elapsedMinutes);
        const remainingSeconds = Math.max(0, remainingMinutes * 60);
        
        console.log('---- Remaining Time Calculation ----');
        console.log('Current time:', new Date().toLocaleString());
        console.log('Browser timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
        console.log('Start time:', new Date(currentSession.startTime).toLocaleString());
        console.log('End time (server):', new Date(currentSession.endTime).toLocaleString());
        console.log('Expected duration (minutes):', expectedDurationMinutes);
        console.log('Actual duration from server (minutes):', actualDurationMinutes);
        console.log('Elapsed minutes:', elapsedMinutes);
        console.log('Remaining minutes (corrected):', remainingMinutes);
        console.log('Remaining seconds (corrected):', remainingSeconds);
        
        return remainingSeconds; // in seconds
    }, [currentSession]);

    return {
        // State
        currentSession,
        sessions,
        loading,
        error,
        answerUpdating,
        answerError,

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
        getRemainingTime
    };
};

export default useTestSessionManager;
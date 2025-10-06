import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    createExamThunk,
    createQuestionThunk,
    deleteExamThunk,
    deleteQuestionThunk,
    fetchAllExams as fetchAllExamsAction,
    fetchExamById,
    setCurrentExam,
    updateQuestionThunk
} from '../store/slices/examSlice.ts';
import { ExamCreateRequest, ExamQuestionRequest, AchievementMeta, RewardType } from '../types/exam.ts';
import { checkCertificateEligibilityThunk, checkDiplomaEligibilityThunk, downloadRewardThunk } from '../store/slices/examSlice.ts';
import { useOlympiadDispatch } from './useOlympiadStore';

const useExamManager = () => {
    const dispatch = useOlympiadDispatch();
    const { exams, currentExam, loading, error, achievements, achievementsLoading } = useSelector((state: RootState) => state.exam);

    // Add the fetchAllExams function
    const fetchAllExams = useCallback(() => {
        return dispatch(fetchAllExamsAction());
    }, [dispatch]);

    const createExam = useCallback((examData: ExamCreateRequest) => {
        return dispatch(createExamThunk(examData));
    }, [dispatch]);

    const removeExam = useCallback((examId: number) => {
        return dispatch(deleteExamThunk(examId));
    }, [dispatch]);

    const selectExam = useCallback((examId: number) => {
        return dispatch(fetchExamById(examId));
    }, [dispatch]);

    const clearSelectedExam = useCallback(() => {
        dispatch(setCurrentExam(null));
    }, [dispatch]);

    const createQuestion = useCallback((questionData: ExamQuestionRequest, testId: number) => {
        return dispatch(createQuestionThunk({ questionData, testId }));
    }, [dispatch]);

    const updateQuestion = useCallback((questionData: ExamQuestionRequest, id: number) => {
        return dispatch(updateQuestionThunk({ questionData, id }));
    }, [dispatch]);

    const removeQuestion = useCallback((questionId: number) => {
        return dispatch(deleteQuestionThunk(questionId));
    }, [dispatch]);

    // Rewards / Achievements
    const checkCertificateEligibility = useCallback((sessionId: number, examId: number) => {
        return dispatch(checkCertificateEligibilityThunk({ sessionId, examId }));
    }, [dispatch]);

    const checkDiplomaEligibility = useCallback((sessionId: number, examId: number) => {
        return dispatch(checkDiplomaEligibilityThunk({ sessionId, examId }));
    }, [dispatch]);

    // Legacy function for backward compatibility - checks both certificate and diploma
    const checkRewardEligibility = useCallback(async (sessionId: number, examId: number) => {
        const certificatePromise = dispatch(checkCertificateEligibilityThunk({ sessionId, examId }));
        const diplomaPromise = dispatch(checkDiplomaEligibilityThunk({ sessionId, examId }));
        
        return Promise.allSettled([certificatePromise, diplomaPromise]);
    }, [dispatch]);

    const downloadReward = useCallback((sessionId: number, rewardType: RewardType) => {
        return dispatch(downloadRewardThunk({ sessionId, rewardType }));
    }, [dispatch]);

    return {
        exams,
        currentExam,
        loading,
        error,
        fetchAllExams,
        createExam,
        removeExam,
        selectExam,
        clearSelectedExam,
        createQuestion,
        updateQuestion,
        removeQuestion,
        // achievements
        achievements,
        achievementsLoading,
        checkRewardEligibility, // Legacy function for backward compatibility
        checkCertificateEligibility, // New separate function for certificate eligibility
        checkDiplomaEligibility, // New separate function for diploma eligibility
        downloadReward
    };
};

export default useExamManager;
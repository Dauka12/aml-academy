import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
    createExamThunk,
    createQuestionThunk,
    deleteExamThunk,
    deleteQuestionThunk,
    fetchAllExams,
    fetchExamById,
    setCurrentExam,
    updateQuestionThunk
} from '../store/slices/examSlice.ts';
import { ExamCreateRequest, ExamQuestionRequest } from '../types/exam.ts';

// Add this to your store.ts file

const useExamManager = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { exams, currentExam, loading, error } = useSelector((state: RootState) => state.exam);

    // Fetch all exams on component mount
    useEffect(() => {
        dispatch(fetchAllExams());
    }, [dispatch]);

    const createExam = (examData: ExamCreateRequest) => {
        return dispatch(createExamThunk(examData));
    };

    const removeExam = (examId: number) => {
        return dispatch(deleteExamThunk(examId));
    };

    const selectExam = (examId: number) => {
        return dispatch(fetchExamById(examId));
    };

    const clearSelectedExam = () => {
        dispatch(setCurrentExam(null));
    };

    const createQuestion = (questionData: ExamQuestionRequest, testId: number) => {
        return dispatch(createQuestionThunk({ questionData, testId }));
    };

    const updateQuestion = (questionData: ExamQuestionRequest, id: number) => {
        return dispatch(updateQuestionThunk({ questionData, id }));
    };

    const removeQuestion = (questionId: number) => {
        return dispatch(deleteQuestionThunk(questionId));
    };

    return {
        exams,
        currentExam,
        loading,
        error,
        createExam,
        removeExam,
        selectExam,
        clearSelectedExam,
        createQuestion,
        updateQuestion,
        removeQuestion,
    };
};

export default useExamManager;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addExam, addQuestion, deleteExam, deleteQuestion, updateExam, updateQuestion } from '../store/slices/examSlice';
import { Exam, Question } from '../types/exam.ts';

const useExamManager = () => {
    const dispatch = useDispatch();
    const exams = useSelector((state: RootState) => state.exam.exams);
    const questions = useSelector((state: RootState) => state.exam.questions);

    const createExam = (exam: Exam) => {
        dispatch(addExam(exam));
    };

    const removeExam = (examId: string) => {
        dispatch(deleteExam(examId));
    };

    const modifyExam = (exam: Exam) => {
        dispatch(updateExam(exam));
    };

    const createQuestion = (question: Question) => {
        dispatch(addQuestion(question));
    };

    const removeQuestion = (questionId: string) => {
        dispatch(deleteQuestion(questionId));
    };

    const modifyQuestion = (question: Question) => {
        dispatch(updateQuestion(question));
    };

    useEffect(() => {
        // Any side effects or data fetching can be handled here
    }, [exams, questions]);

    return {
        exams,
        questions,
        createExam,
        removeExam,
        modifyExam,
        createQuestion,
        removeQuestion,
        modifyQuestion,
    };
};

export default useExamManager;
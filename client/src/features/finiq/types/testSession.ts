import { OptionResponse } from './exam';

export interface StudentExamSessionRequest {
    examTestId: number;
}

export interface UpdateAnswerRequest {
    studentExamSessionId: number;
    questionId: number;
    selectedOptionId: number;
}

export interface StudentAnswerResponse {
    id: number;
    questionId: number;
    selectedOptionId: number;
}

export interface SessionExamQuestionResponse {
    id: number;
    questionRus: string;
    questionKaz: string;
    options: OptionResponse[];
}

export interface SessionExamResponse {
    id: number;
    examData: {
        id: number;
        nameRus: string;
        nameKaz: string;
        typeRus: string;
        typeKaz: string;
        startTime: string;
        durationInMinutes: number;
        questions: {
            id: number;
            questionRus: string;
            questionKaz: string;
            options: {
                id: number;
                nameRus: string;
                nameKaz: string;
            }[];
        }[];
        studentAnswer: {
            id: number;
            questionId: number;
            selectedOptionId: number;
        }[];
    };
    startTime: string;
    endTime: string;
}

export interface StudentExamSessionResponses {
    id: number;
    examData: {
        id: number;
        nameRus: string;
        nameKaz: string;
        typeRus: string;
        typeKaz: string;
        startTime: string;
        durationInMinutes: number;
    };
    startTime: string;
    endTime: string;
}

export interface TestSessionState {
    currentSession: SessionExamResponse | null;
    sessions: StudentExamSessionResponses[];
    loading: boolean;
    error: string | null;
    answerUpdating: boolean;
    answerError: string | null;
}
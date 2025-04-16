// Types for API requests and responses
export interface Option {
    id?: number;
    nameRus: string;
    nameKaz: string;
}

export interface OptionRequest {
    nameRus: string;
    nameKaz: string;
}

export interface OptionResponse {
    id: number;
    nameRus: string;
    nameKaz: string;
}

export interface ExamQuestion {
    id?: number;
    questionRus: string;
    questionKaz: string;
    options: Option[];
    correctOptionId: number;
    testId?: number;
}

export interface ExamQuestionRequest {
    questionRus: string;
    questionKaz: string;
    options: OptionRequest[];
    correctOptionIndex: number;
}

export interface ExamQuestionResponse {
    id: number;
    questionRus: string;
    questionKaz: string;
    options: OptionResponse[];
    correctOptionIndex: number;
}

export interface ExamTest {
    id?: number;
    title: string;
    nameRus: string;
    nameKaz: string;
    typeRus: string;
    typeKaz: string;
    startTime?: string;
    durationInMinutes: number;
    questions?: ExamQuestion[];
}

export interface ExamCreateRequest {
    nameRus: string;
    nameKaz: string;
    typeRus: string;
    typeKaz: string;
    startTime: string;
    durationInMinutes: number;
    categories: number[];
}

export interface ExamResponse {
    id: number;
    nameRus: string;
    nameKaz: string;
    typeRus: string;
    typeKaz: string;
    startTime: string;
    durationInMinutes: number;
    questions?: ExamQuestionResponse[];
}

// Redux state types
export interface ExamState {
    exams: ExamResponse[];
    currentExam: ExamResponse | null;
    currentQuestion: ExamQuestionResponse | null;
    loading: boolean;
    error: string | null;
}
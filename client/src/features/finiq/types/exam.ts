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
    id: string | number;
    questionRus: string;
    questionKaz: string;
    options: Option[];
    correctOptionId: number;
    testId?: number;
    text?: string; // For backward compatibility
}

export interface Question {
    id: string;
    text: string;
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
    correctOptionId: number;
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
    questions: ExamQuestionRequest[];
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

// Achievement / Reward types
export type RewardType = 'certificate' | 'diploma';

export interface AchievementMeta {
    sessionId: number;            // Student exam session ID
    examId: number;               // Exam id
    rewardType: RewardType;       // certificate | diploma
    obtained: boolean;            // Whether file was already downloaded
    title?: string;               // Display title
    date?: string;                // Award date or exam date
    place?: number;               // For diploma (optional)
    blobUrl?: string;             // Object URL after download
}

// Region statistics types
export interface RegionTopStudent {
    studentId: number;
    firstname: string;
    lastname: string;
    middlename?: string | null;
    email: string;
    organization: string;
    categoryName?: string;
    categoryId: number;
    score: number;
    rank: number;
    startTime?: string;
    endTime?: string;
}

export interface RegionCategoryTopStudents {
    categoryId: number;
    categoryNameRus: string;
    categoryNameKaz: string;
    topStudents: RegionTopStudent[];
}

export interface ExamVerificationResponse {
    studentId: number;
    firstname: string;
    lastname: string;
    middlename?: string | null;
    email: string;
    organization?: string | null;
    categoryNameRus: string;
    categoryNameKaz: string;
    categoryId: number;
    score: number;
    rank: number;
    startTime: string;
    endTime: string;
    durationMinutes: number;
}

// Overall Statistics Types
export interface CategoryStatistics {
    categoryId: number;
    categoryNameRus: string;
    categoryNameKaz: string;
    totalStudentsEnrolled: number;
    totalAttempts: number;
    completedAttempts: number;
    passedAttempts: number;
    failedAttempts: number;
    averageScore: number;
    passRate: number;
    completionRate: number;
}

export interface TestStatistics {
    testId: number;
    testNameRus: string;
    testNameKaz: string;
    testTypeRus: string;
    testTypeKaz: string;
    startTime: string;
    durationInMinutes: number;
    totalAttempts: number;
    completedAttempts: number;
    passedAttempts: number;
    failedAttempts: number;
    averageScore: number;
    passRate: number;
    completionRate: number;
    totalQuestions: number;
    categoryNames: string[];
    averageTimeSpent: number;
}

export interface StudentStatistics {
    studentId: number;
    studentName: string;
    studentEmail: string;
    totalAttempts: number;
    completedAttempts: number;
    passedAttempts: number;
    failedAttempts: number;
    averageScore: number;
    completionRate: number;
    passRate: number;
    bestCategory: string;
    worstCategory: string;
}

export interface OverallStatistics {
    totalStudents: number;
    totalTests: number;
    totalCategories: number;
    totalAttempts: number;
    completedAttempts: number;
    passedAttempts: number;
    failedAttempts: number;
    overallPassRate: number;
    overallCompletionRate: number;
    averageScore: number;
    generatedAt: string;
    topCategories: CategoryStatistics[];
    topTests: TestStatistics[];
    topStudents: StudentStatistics[];
    attemptsLast7Days: number;
    attemptsLast30Days: number;
}

// Redux state types
export interface ExamState {
    exams: ExamResponse[];
    currentExam: ExamResponse | null;
    currentQuestion: ExamQuestionResponse | null;
    loading: boolean;
    error: string | null;
    questions: { [examId: string]: Question[] }; // Add this for QuestionList compatibility
    achievements?: AchievementMeta[];            // Discovered achievements (eligibility checked)
    achievementsLoading?: boolean;
}
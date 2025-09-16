import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createExam,
    createQuestion as createQuestionApi,
    deleteExam as deleteExamApi,
    deleteQuestion as deleteQuestionApi,
    getAllExams,
    getAllStudentExams,
    getExamById,
    updateQuestion as updateQuestionApi
} from '../../api/examApi.ts';
import { ExamCreateRequest, ExamQuestionRequest, ExamQuestionResponse, ExamResponse, ExamState, Question, AchievementMeta, RewardType } from '../../types/exam.ts';
import { getRewardEligibility, getCertificate, getDiploma } from '../../api/examApi.ts';
import i18n from '../../../../settings/i18n.js';

// Initial state
const initialState: ExamState = {
    exams: [],
    currentExam: null,
    currentQuestion: null,
    loading: false,
    error: null,
    questions: {}, // Initialize empty questions object for backward compatibility
    achievements: [],
    achievementsLoading: false
};

// Async thunk actions
export const fetchAllExams = createAsyncThunk(
    'olympiadExam/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await getAllExams();
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to fetch exams');
        }
    }
);

// Async thunk actions
export const fetchAllStudentExams = createAsyncThunk(
    'olympiadExam/fetchAllStudent',
    async (_, { rejectWithValue }) => {
        try {
            return await getAllStudentExams();
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to fetch exams');
        }
    }
);


export const fetchExamById = createAsyncThunk(
    'olympiadExam/fetchById',
    async (id: number, { rejectWithValue }) => {
        try {
            return await getExamById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to fetch exam');
        }
    }
);

export const createExamThunk = createAsyncThunk(
    'olympiadExam/create',
    async (examData: ExamCreateRequest, { rejectWithValue }) => {
        try {
            return await createExam(examData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to create exam');
        }
    }
);

export const deleteExamThunk = createAsyncThunk(
    'olympiadExam/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteExamApi(id);
            return id;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to delete exam');
        }
    }
);

export const createQuestionThunk = createAsyncThunk(
    'olympiadExam/createQuestion',
    async ({ questionData, testId }: { questionData: ExamQuestionRequest, testId: number }, { rejectWithValue }) => {
        try {
            return await createQuestionApi(questionData, testId);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to create question');
        }
    }
);

export const updateQuestionThunk = createAsyncThunk(
    'olympiadExam/updateQuestion',
    async ({ questionData, id }: { questionData: ExamQuestionRequest, id: number }, { rejectWithValue }) => {
        try {
            await updateQuestionApi(questionData, id);
            const optionsWithId = questionData.options.map((option, index) => ({
                ...option,
                id: index + 1 // Assign a unique id to each option
            }));
            return { 
                ...questionData, 
                id, 
                correctOptionId: optionsWithId[questionData.correctOptionIndex].id, 
                options: optionsWithId 
            } as ExamQuestionResponse;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to update question');
        }
    }
);

export const deleteQuestionThunk = createAsyncThunk(
    'olympiadExam/deleteQuestion',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteQuestionApi(id); 
            return id;
        } catch (error: unknown) {
            
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to delete question');
        }
    }
);

// Check reward eligibility for a session
export const checkRewardEligibilityThunk = createAsyncThunk(
    'olympiadExam/checkRewardEligibility',
    async ({ sessionId, examId }: { sessionId: number; examId: number }, { rejectWithValue }) => {
        try {
            const res = await getRewardEligibility(sessionId);
            return { sessionId, examId, ...res };
        } catch (error: unknown) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue('Failed to check reward eligibility');
        }
    }
);

// Download reward file (certificate/diploma)
export const downloadRewardThunk = createAsyncThunk(
    'olympiadExam/downloadReward',
    async ({ sessionId, rewardType }: { sessionId: number; rewardType: RewardType }, { rejectWithValue }) => {
        try {
            const lang = i18n?.language || 'ru';
            const blob = (rewardType === 'certificate'
                ? await getCertificate(sessionId, lang)
                : await getDiploma(sessionId, lang)) as unknown as Blob;
            const blobUrl = URL.createObjectURL(blob);
            return { sessionId, rewardType, blobUrl };
        } catch (error: unknown) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue('Failed to download reward');
        }
    }
);

// Slice
const examSlice = createSlice({
    name: 'olympiadExam',
    initialState,
    reducers: {
        setCurrentExam: (state, action: PayloadAction<ExamResponse | null>) => {
            state.currentExam = action.payload;
        },
        setCurrentQuestion: (state, action: PayloadAction<ExamQuestionResponse | null>) => {
            state.currentQuestion = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        // Add these for QuestionEditor compatibility
        addQuestion: (state, action: PayloadAction<{ text: string, examId: string }>) => {
            const { text, examId } = action.payload;
            if (!state.questions[examId]) {
                state.questions[examId] = [];
            }
            const newQuestion: Question = {
                id: Date.now().toString(),
                text
            };
            state.questions[examId].push(newQuestion);
        },
        updateQuestion: (state, action: PayloadAction<{ id: string, text: string, examId: string }>) => {
            const { id, text, examId } = action.payload;
            if (state.questions[examId]) {
                const questionIndex = state.questions[examId].findIndex(q => q.id === id);
                if (questionIndex !== -1) {
                    state.questions[examId][questionIndex].text = text;
                }
            }
        },
        deleteQuestion: (state, action: PayloadAction<{ examId: string, questionId: string }>) => {
            const { examId, questionId } = action.payload;
            if (state.questions[examId]) {
                state.questions[examId] = state.questions[examId].filter(q => q.id !== questionId);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all exams
            .addCase(fetchAllExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllExams.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = action.payload;
            })
            .addCase(fetchAllExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch all student exams (populate the same exams list for now)
            .addCase(fetchAllStudentExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllStudentExams.fulfilled, (state, action) => {
                state.loading = false;
                // If in future we want a separate list, introduce state.studentExams
                state.exams = action.payload;
            })
            .addCase(fetchAllStudentExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch exam by id
            .addCase(fetchExamById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExamById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentExam = action.payload;
            })
            .addCase(fetchExamById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create exam
            .addCase(createExamThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createExamThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = [...state.exams, action.payload];
            })
            .addCase(createExamThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete exam
            .addCase(deleteExamThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteExamThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = state.exams.filter(exam => exam.id !== action.payload);
                if (state.currentExam && state.currentExam.id === action.payload) {
                    state.currentExam = null;
                }
            })
            .addCase(deleteExamThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create question
            .addCase(createQuestionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createQuestionThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.currentExam) {
                    state.currentExam = {
                        ...state.currentExam,
                        questions: [...(state.currentExam.questions || []), action.payload]
                    };
                }
            })
            .addCase(createQuestionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update question
            .addCase(updateQuestionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuestionThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.currentExam && state.currentExam.questions) {
                    state.currentExam = {
                        ...state.currentExam,
                        questions: state.currentExam.questions.map(q =>
                            q.id === action.payload.id ? { ...q, ...action.payload } : q
                        )
                    };
                }
            })
            .addCase(updateQuestionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete question
            .addCase(deleteQuestionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteQuestionThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (state.currentExam && state.currentExam.questions) {
                    state.currentExam = {
                        ...state.currentExam,
                        questions: state.currentExam.questions.filter(q => q.id !== action.payload)
                    };
                }
            })
            .addCase(deleteQuestionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Check reward eligibility
            .addCase(checkRewardEligibilityThunk.pending, (state) => {
                state.achievementsLoading = true;
            })
            .addCase(checkRewardEligibilityThunk.fulfilled, (state, action: any) => {
                state.achievementsLoading = false;
                const { sessionId, examId, eligible, rewardType } = action.payload as any;
                // Backend сейчас может не присылать явный флаг eligible, поэтому считаем eligible=true если есть rewardType
                if (!rewardType) return;
                const isEligible = typeof eligible === 'boolean' ? eligible : true;
                if (!isEligible) return;
                const rewardTypes: RewardType[] = Array.isArray(rewardType) ? rewardType : [rewardType];
                rewardTypes.forEach(rt => {
                    const exists = state.achievements?.some((a: AchievementMeta) => a.sessionId === sessionId && a.rewardType === rt);
                    if (!exists) {
                        const meta: AchievementMeta = {
                            sessionId,
                            examId,
                            rewardType: rt,
                            obtained: false,
                            title: rt === 'certificate' ? 'Сертификат' : 'Диплом'
                        };
                        state.achievements?.push(meta);
                    }
                });
            })
            .addCase(checkRewardEligibilityThunk.rejected, (state, action) => {
                state.achievementsLoading = false;
                // Do not set global error to avoid UI noise; could log separately
            })

            // Download reward
            .addCase(downloadRewardThunk.fulfilled, (state, action: any) => {
                const { sessionId, rewardType, blobUrl } = action.payload as any;
                const ach = state.achievements?.find((a: AchievementMeta) => a.sessionId === sessionId && a.rewardType === rewardType);
                if (ach) {
                    ach.obtained = true;
                    ach.blobUrl = blobUrl;
                }
            })
            .addCase(downloadRewardThunk.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export const { 
    setCurrentExam, 
    setCurrentQuestion, 
    clearError,
    addQuestion,
    updateQuestion,
    deleteQuestion
} = examSlice.actions;

export default examSlice.reducer;
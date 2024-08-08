// src/store/slices/answersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Answer {
  pageId: number;
  taskId: number;
  answer: string;
}

interface AnswersState {
  answers: Answer[];
}

const initialState: AnswersState = {
  answers: [],
};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers.push(action.payload);
    },
    clearAnswers: state => {
      state.answers = [];
    },
  },
});

export const { addAnswer, clearAnswers } = answersSlice.actions;
export default answersSlice.reducer;

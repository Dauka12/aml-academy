// src/store/slices/answersSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: [],
};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    clearAnswers: state => {
      state.answers = [];
    },
  },
});

export const { addAnswer, clearAnswers } = answersSlice.actions;
export default answersSlice.reducer;

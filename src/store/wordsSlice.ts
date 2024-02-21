import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Word } from '../interfaces';
import { getWords } from '../api';

interface wordsState {
  words: Word[] | string[];
  status: 'idle' | 'loading' | 'error' | 'advice';
}

const initialState: wordsState = {
  words: [],
  status: 'idle',
};

export const fetchData = createAsyncThunk('words/get', getWords);

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<Word[] | string[]>) => {
          if (typeof action.payload[0] === 'string') {
            state.status = 'advice';
            state.words = action.payload;
            return;
          }
          console.log(action.payload);
          state.words = action.payload;
          state.status = 'idle';
        },
      )
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default wordsSlice.reducer;

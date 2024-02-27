import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Word } from '../interfaces';
import { getWords } from '../api';

interface wordsState {
  words: Word[] | string[];
  status: 'idle' | 'loading' | 'error' | 'advice';
  favorites: Word[];
  partOfSpeech: string | null;
}

const initialState: wordsState = {
  words: [],
  status: 'idle',
  favorites: [],
  partOfSpeech: null,
};

export const fetchData = createAsyncThunk('words/get', getWords);

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Word>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<Word>) => {
      state.favorites = state.favorites.filter(
        (item) => item.meta.id !== action.payload.meta.id,
      );
    },
    updateFavorite: (state, action: PayloadAction<Word[]>) => {
      state.favorites = action.payload;
    },
    changePartOfSpeech: (state, action: PayloadAction<string | null>) => {
      state.partOfSpeech = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<Word[] | string[]>) => {
          if (typeof action.payload[0] === 'string') {
            state.status = 'advice';
            state.words = action.payload
              .slice(0, 10)
              .sort((a, b) =>
                (a as string)
                  .toLowerCase()
                  .localeCompare((b as string).toLowerCase()),
              );
            return;
          }
          state.words = action.payload
            .slice(0, 10)
            .sort((a, b) =>
              (a as Word).meta.stems[0]
                .toLowerCase()
                .localeCompare((b as Word).meta.stems[0].toLowerCase()),
            );
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

export const {
  addToFavorite,
  removeFromFavorite,
  updateFavorite,
  changePartOfSpeech,
} = wordsSlice.actions;

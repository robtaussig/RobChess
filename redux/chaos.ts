import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { movePiece, init, isCurrentUserTurn } from './board';

export interface Chaos {
  difficulty: number;
}

const INITIAL_STATE: Chaos = {
  difficulty: 5,
};

const chaosSlice = createSlice({
  name: 'chaos',
  initialState: INITIAL_STATE,
  reducers: {
    reset(state, action) {
      return INITIAL_STATE;
    },
    changeDifficulty(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.difficulty = action.payload;
    },
  },
  extraReducers: {
    [init.type](state, action) {
      return {
        ...INITIAL_STATE,
        difficulty: action.payload.difficulty ?? 5,
      };
    }
  },
})

export const { reset, changeDifficulty } = chaosSlice.actions

export const chaosSelector = (state: AppState) => state.chaos

export default chaosSlice.reducer

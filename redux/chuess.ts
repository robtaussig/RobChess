import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { movePiece, init, isCurrentUserTurn } from './board';

export interface Chuess {
  peeksLeft: number;
  peeked: boolean;
  difficulty: number;
}

const INITIAL_STATE: Chuess = {
  peeksLeft: 5,
  peeked: true,
  difficulty: 5,
};

const chuessSlice = createSlice({
  name: 'chuess',
  initialState: INITIAL_STATE,
  reducers: {
    peek(state) {
      if (state.peeksLeft > 0) {
        state.peeked = true;
      }
      state.peeksLeft--;
    },
    changeDifficulty(state, action: PayloadAction<number>) {
      state.difficulty = action.payload;
    },
    reset(state, action) {
      return INITIAL_STATE;
    },
  },
  extraReducers: {
    [movePiece.type](state) {
      state.peeked = false;
    },
    [init.type]() {
      return INITIAL_STATE;
    }
  },
})

export const { reset, peek, changeDifficulty } = chuessSlice.actions

export const chuessSelector = (state: AppState) => state.chuess

export const chuessBoardSelector = (state: AppState) => {
  if (!state.chuess.peeked && isCurrentUserTurn(state)) {
    return state.board.history[state.board.history.length - 1]?.fen;
  }

  return state.board.fen;
};

export const lastChuessMoveSelector = (state: AppState) => {
  if (!state.chuess.peeked && isCurrentUserTurn(state)) {
    return state.board.history[state.board.history.length - 1]?.move ?? null;
  }

  return state.board.lastMove;
};

const EMPTY_VALID_MOVES: {
  [pos: number]: number[];
} = {};
export const validChuessMovesSelector = (state: AppState) => {
  return state.board.history.length > 0 ?
    EMPTY_VALID_MOVES :
    state.board.validMoves;
};

export default chuessSlice.reducer

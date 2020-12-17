import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { movePiece, init, isCurrentUserTurn, claimSeat } from './board';

export interface Chuess {
  peeksLeft: number;
  peeked: boolean;
  difficulty: number;
  displayRules: boolean;
  displayChangelog: boolean;
  displayReportBug: boolean;
}

const INITIAL_STATE: Chuess = {
  peeksLeft: 5,
  peeked: true,
  difficulty: 5,
  displayRules: false,
  displayChangelog: false,
  displayReportBug: false,
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
    displayRulesModal(state, action: PayloadAction<boolean>) {
      state.displayRules = action.payload;
    },
    displayChangelogModal(state, action: PayloadAction<boolean>) {
      state.displayChangelog = action.payload;
    },
    displayBugModal(state, action: PayloadAction<boolean>) {
      state.displayReportBug = action.payload;
    }
  },
  extraReducers: {
    [movePiece.type](state) {
      state.peeked = false;
    },
    [init.type]() {
      return INITIAL_STATE;
    },
    [claimSeat.type](state, action) {
      if (state.peeksLeft === 5 && action.payload.isUser !== false && action.payload.color === 'black') {
        state.peeksLeft++;
      }
    }
  },
})

export const { reset, peek, changeDifficulty, displayRulesModal, displayChangelogModal, displayBugModal } = chuessSlice.actions

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

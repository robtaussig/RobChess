import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { makeMove, getValidMoves, initGame } from './util';

export interface Board {
  fen: string;
  isMovingFrom: number;
  isMovingOver: number;
  validMoves: {
    [pos: number]: number[];
  };
  lastMove: [number, number];
  history: Moment[];
  future: Moment[];
}

export interface Moment {
  fen: string;
  move: [number, number];
}

const INITIAL_STATE: Board = {
  fen: null,
  isMovingFrom: null,
  isMovingOver: null,
  validMoves: {},
  lastMove: null,
  history: [],
  future: [],
}

const boardSlice = createSlice({
  name: 'board',
  initialState: INITIAL_STATE,
  reducers: {
    init(state) {
      const { fen, validMoves } = initGame();
      state.fen = fen;
      state.validMoves = validMoves;
      state.history = [];
      state.future = [];
      state.lastMove = null;
    },
    movingFrom(state, action) {
      state.isMovingFrom = action.payload;
    },
    movingOver(state, action) {
      if (state.isMovingFrom !== null) {
        state.isMovingOver = action.payload;
      }
    },
    moveTo(state) {
      if (
        state.isMovingFrom !== state.isMovingOver &&
        state.validMoves[state.isMovingFrom]?.includes(state.isMovingOver)
      ) {
        const { fen, validMoves } = makeMove(state.fen, state.isMovingFrom, state.isMovingOver);
        state.history.push({ fen: state.fen, move: state.lastMove });
        state.lastMove = [state.isMovingFrom, state.isMovingOver];
        state.fen = fen;
        state.future = [];
        state.validMoves = validMoves;
      }
      state.isMovingFrom = null;
      state.isMovingOver = null;
    },
    reset() {
      return INITIAL_STATE;
    },
    goBack(state) {
      if (state.history.length > 0) {
        const { fen, move } = state.history.pop();
        state.future.push({ fen: state.fen, move: state.lastMove });
        state.fen = fen;
        state.lastMove = move;
        state.validMoves = getValidMoves(fen);
      }
    },
    goForward(state) {
      if (state.future.length > 0) {
        const { fen, move } = state.future.pop();
        state.history.push({ fen: state.fen, move: state.lastMove });
        state.fen = fen;
        state.lastMove = move;
        state.validMoves = getValidMoves(fen);
      }
    }
  }
})

export const {
  movingFrom,
  movingOver,
  moveTo,
  reset,
  init,
  goBack,
  goForward,
} = boardSlice.actions

export const boardSelector = (state: AppState) => state.board

export default boardSlice.reducer

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
}

const INITIAL_STATE: Board = {
  fen: null,
  isMovingFrom: null,
  isMovingOver: null,
  validMoves: {},
  lastMove: null,
}

const boardSlice = createSlice({
  name: 'board',
  initialState: INITIAL_STATE,
  reducers: {
    init(state) {
      const { fen, validMoves } = initGame();
      state.fen = fen;
      state.validMoves = validMoves;
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
      if (state.isMovingFrom !== state.isMovingOver) {
        const { fen, validMoves } = makeMove(state.fen, state.isMovingFrom, state.isMovingOver);
        state.lastMove = [state.isMovingFrom, state.isMovingOver];
        state.fen = fen;
        state.validMoves = validMoves;
      }
      state.isMovingFrom = null;
      state.isMovingOver = null;
    },
    reset(state, action) {
      return INITIAL_STATE;
    },
  }
})

export const { movingFrom, movingOver, moveTo, reset, init } = boardSlice.actions

export const boardSelector = (state: AppState) => state.board

export default boardSlice.reducer

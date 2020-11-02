import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { makeMove, getValidMoves, initGame, currentTurn } from './util';
import { User } from './user';
import { wrap } from 'comlink';
import { WorkerInterface } from '../engine/index.worker';

const comLinkWorker = typeof window !== 'undefined' ?
  wrap<WorkerInterface>(new Worker('../engine/index.worker', {
    type: 'module',
  })) : null;

export enum PlayerState {
  Playing = 'playing',
  OfferedDraw = 'draw',
  Resigned = 'resigned',
  Left = 'left',
  Rematch = 'rematch',
}

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
  whitePlayer: User;
  blackPlayer: User;
  opponentState: PlayerState;
  playerState: PlayerState;
  premoves: { from: number, to: number }[];
}

export interface Moment {
  fen: string;
  move: [number, number];
}

export const AI_PLAYER: User = {
  name: 'AI',
  rating: 1000,
};

const INITIAL_STATE: Board = {
  fen: null,
  isMovingFrom: null,
  isMovingOver: null,
  validMoves: {},
  lastMove: null,
  history: [],
  future: [],
  blackPlayer: null,
  whitePlayer: null,
  opponentState: null,
  playerState: null,
  premoves: [],
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
      state.opponentState = null;
      state.playerState = null;
    },
    movingFrom(state, action) {
      state.isMovingFrom = action.payload;
    },
    movingOver(state, action) {
      if (state.isMovingFrom !== null) {
        state.isMovingOver = action.payload;
      }
    },
    moveTo(state, action?: PayloadAction<number>) {
      const target = state.isMovingOver ?? action.payload;
      if (
        state.isMovingFrom !== target &&
        state.validMoves[state.isMovingFrom]?.includes(target)
      ) {
        const { fen, validMoves } = makeMove(state.fen, state.isMovingFrom, target);
        state.history.push({ fen: state.fen, move: state.lastMove });
        state.lastMove = [state.isMovingFrom, target];
        state.fen = fen;
        state.future = [];
        state.validMoves = validMoves;
        if (
          state.premoves.find(premove =>
            premove.from === state.isMovingFrom && premove.to === target
        )) {
          state.premoves = state.premoves.filter(premove =>
            premove.from !== state.isMovingFrom || premove.to !== target
          )
        }
      }
      if (state.isMovingOver !== null && state.isMovingFrom !== state.isMovingOver) {
        state.isMovingFrom = null;
      }
      state.isMovingOver = null;
    },
    premove(state, action: PayloadAction<{ from: number, to: number}>) {
      const existingPremove = state.premoves.findIndex(({ from, to }) =>
        from === action.payload.from && to === action.payload.to)
      if (existingPremove > -1) {
        state.premoves.splice(existingPremove, 1);
      } else {
        state.premoves.push(action.payload);
      }
    },
    clearPremoves(state) {
      state.premoves = [];
    },
    movePiece(state, action: PayloadAction<{ from: number, to: number }>) {
      const { fen, validMoves } = makeMove(state.fen, action.payload.from, action.payload.to);
      state.history.push({ fen: state.fen, move: state.lastMove });
      state.lastMove = [action.payload.from, action.payload.to];
      state.fen = fen;
      state.future = [];
      state.validMoves = validMoves;
      if (
        state.premoves.find(premove =>
          premove.from === action.payload.from && premove.to === action.payload.to
      )) {
        state.premoves = state.premoves.filter(premove =>
          premove.from !== action.payload.from || premove.to !== action.payload.to
        )
      }
    },
    reset() {
      return INITIAL_STATE;
    },
    goBack(state) {
      if (state.history.length > 0) {
        const { fen, move } = state.history.pop();
        state.future.unshift({ fen: state.fen, move: state.lastMove });
        state.fen = fen;
        state.lastMove = move;
        state.validMoves = getValidMoves(fen);
      }
    },
    goForward(state) {
      if (state.future.length > 0) {
        const { fen, move } = state.future.shift();
        state.history.push({ fen: state.fen, move: state.lastMove });
        state.fen = fen;
        state.lastMove = move;
        state.validMoves = getValidMoves(fen);
      }
    },
    goTo(state, action: PayloadAction<number>) {
      const combinedState = state.history
        .concat({ move: state.lastMove, fen: state.fen })
        .concat(state.future);
      
      const { move, fen } = combinedState[action.payload + 1];
      state.history = combinedState.slice(0, action.payload + 1);
      state.future = combinedState.slice(action.payload + 2);
      state.lastMove = move;
      state.fen = fen;
      state.validMoves = getValidMoves(fen);
    },
    claimSeat(state, action: PayloadAction<{
      user: User,
      color: 'white' | 'black',
      isUser?: boolean,
    }>) {
      if (action.payload.color === 'white') {
        state.whitePlayer = action.payload.user;
      } else {
        state.blackPlayer = action.payload.user;
      }
      if (action.payload.isUser === false) {
        state.opponentState = PlayerState.Playing;
      } else {
        state.playerState = PlayerState.Playing;
      }
    },
    assignAI(state, action: PayloadAction<'white' | 'black'>) {
      if (action.payload === 'white') {
        state.whitePlayer = AI_PLAYER;
      } else {
        state.blackPlayer = AI_PLAYER;
      }
    },
    resign(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.playerState = PlayerState.Resigned;
      } else {
        state.opponentState = PlayerState.Resigned;
      }
    },
    draw(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.playerState = PlayerState.OfferedDraw;
      } else {
        state.opponentState = PlayerState.OfferedDraw;
      }
    }
  }
})

const convertToFenPos = (pos: number): number => {
  const row = Math.floor(pos / 10) - 1;
  const col = pos % 10;
  return (row * 8) + col - 1;
};

export const makeEngineMove = (): ThunkAction<void, AppState, void, any> =>
  async (dispatch, getState) => {
    const { board } = getState();
    const bestMove = await comLinkWorker.getBestMove(board.fen, 4);
    
    if (typeof bestMove === 'string') {
      const [from, to] = (bestMove as string).split('-');
      dispatch(movePiece({ from: Number(from), to: Number(to) }));
    } else if (bestMove) {
      const [,move] = bestMove;
      const [from, to] = move.split('-').map(Number).map(convertToFenPos);
      dispatch(movePiece({ from, to }));
    }
  };

export const {
  movingFrom,
  movingOver,
  moveTo,
  reset,
  init,
  goBack,
  goForward,
  claimSeat,
  assignAI,
  goTo,
  movePiece,
  resign,
  draw,
  premove,
  clearPremoves,
} = boardSlice.actions

export const boardSelector = (state: AppState) => state.board

const isCurrentUserTurn = (state: AppState) => {
  if (currentTurn(state.board.fen) === 'black') {
    if (state.user === state.board.blackPlayer) {
      return true;
    }
  } else if (state.user === state.board.whitePlayer) {
    return true;
  }
  return false;
};

export const chuessBoardSelector = (state: AppState) => {
  if (isCurrentUserTurn(state)) {
    return state.board.history[state.board.history.length - 1]?.fen ?? state.board.fen;
  }

  return state.board.fen;
};

export const lastChuessMoveSelector = (state: AppState) => {
  if (isCurrentUserTurn(state)) {
    return state.board.history[state.board.history.length - 1]?.move ?? state.board.lastMove;
  }

  return state.board.lastMove;
};

export default boardSlice.reducer

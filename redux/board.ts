import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { makeMove, getValidMoves, initGame, currentTurn } from './util';
import { User } from './user';
import { wrap } from 'comlink';
import { WorkerInterface } from '../engine/index.worker';

const PREMOVE_MAXIMUM = 3;

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

export enum GameTypes {
  Chess = 'Chess',
  Chuess = 'Chuess',
}

export interface Board {
  fen: string;
  isMovingFrom: number;
  isMovingOver: number;
  validMoves: {
    [pos: number]: number[];
  };
  lastMove: [number, number, string?];
  history: Moment[];
  future: Moment[];
  whitePlayer: User;
  blackPlayer: User;
  opponentState: PlayerState;
  playerState: PlayerState;
  premoves: { from: number, to: number }[];
  isPromoting: boolean;
  gameType: GameTypes;
}

export interface Moment {
  fen: string;
  move: [number, number, string?];
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
  isPromoting: false,
  gameType: null,
}

const boardSlice = createSlice({
  name: 'board',
  initialState: INITIAL_STATE,
  reducers: {
    init(state, action?: PayloadAction<GameTypes>) {
      const { fen, validMoves } = initGame();
      state.fen = fen;
      state.validMoves = validMoves;
      state.history = [];
      state.future = [];
      state.lastMove = null;
      state.opponentState = null;
      state.playerState = null;
      state.gameType = action.payload ?? GameTypes.Chess;
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
        const { fen, validMoves, isPromotion } = makeMove(
          state.fen,
          state.isMovingFrom,
          target,
        );

        state.history.push({ fen: state.fen, move: state.lastMove });
        state.future = [];
        state.lastMove = [state.isMovingFrom, target];

        if (isPromotion) {
          state.isPromoting = isPromotion;
        } else {
          state.fen = fen;
          state.validMoves = validMoves;
        }
        
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
        if (state.premoves.length < PREMOVE_MAXIMUM) {
        state.premoves.push(action.payload);
        }
      }
    },
    clearPremoves(state) {
      state.premoves = [];
    },
    movePiece(state, action: PayloadAction<{ from: number, to: number }>) {
      const { fen, validMoves, isPromotion } = makeMove(
        state.fen,
        action.payload.from,
        action.payload.to,
      );
      state.future = [];
      state.history.push({ fen: state.fen, move: state.lastMove });
      state.lastMove = [action.payload.from, action.payload.to];

      if (isPromotion) {
        state.isPromoting = isPromotion;
      } else {
        state.fen = fen;
        state.validMoves = validMoves;
      }

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
    },
    promote(state, action: PayloadAction<string>) {
      const { fen, validMoves, isPromotion } = makeMove(
        state.fen,
        state.lastMove[0],
        state.lastMove[1],
        action.payload,
      );
      state.lastMove = [state.lastMove[0], state.lastMove[1], action.payload];
      state.fen = fen;
      state.validMoves = validMoves;
      state.isPromoting = false;
    },
  }
})

const convertToFenPos = (pos: number): number => {
  const row = Math.floor(pos / 10) - 1;
  const col = pos % 10;
  return (row * 8) + col - 1;
};

const getBestMoveFromEngine = (bestMove: string | [number, string]): [number, number] => {
  if (typeof bestMove === 'string') {
    return (bestMove as string).split('-').map(Number) as [number, number];
  } else if (bestMove) {
    const [,move] = bestMove;
    return move.split('-').map(Number).map(convertToFenPos) as [number, number];
  } else {
    return [null, null];
  }
};

export const makeEngineMove = (): ThunkAction<void, AppState, void, any> =>
  async (dispatch, getState) => {
    const { board } = getState();
    if (board.gameType === GameTypes.Chuess) {
      return dispatch(makeEngineChuessMove());
    } else {
      const bestMove = await comLinkWorker.getBestMove(board.fen, 4);
      const [from, to] = getBestMoveFromEngine(bestMove);
      dispatch(movePiece({ from, to }));
    }
  };

const fenPosToEnginePos = (pos: number): number => {
  const row = Math.floor(pos / 8) + 1;
  const col = pos % 8;
  return (row * 10) + (col + 1);
};

const fenMovesToEngineMoves = ([from, to]: [number, number]) => {
  
  return `${fenPosToEnginePos(from)}-${fenPosToEnginePos(to)}`;
};

const makeEngineChuessMove = (): ThunkAction<void, AppState, void, any> =>
  async (dispatch, getState) => {
    const { board, chuess } = getState();
    //Change that AI auto-peeks
    if (Math.random() < (chuess.difficulty / 10)) {
      const bestMove = await comLinkWorker.getBestMove(board.fen, 4);
      const [from, to] = getBestMoveFromEngine(bestMove);
      dispatch(movePiece({ from, to }));
    } else {
      const firstFen = board.history.length > 0 ?
      board.history[board.history.length - 1].fen :
      board.fen;
      if (Object.keys(board.validMoves).length > 0) {
        const bestOpponentMove = await comLinkWorker.getBestMove(firstFen, 4);
        const [from, to] = getBestMoveFromEngine(bestOpponentMove);
        const { fen: secondFen, validMoves, isPromotion } = makeMove(
          firstFen,
          from,
          to,
        );

        const mutualValidMoves = Object.entries(board.validMoves)
          .reduce((next, [origin, targets]) => {
            if (origin in validMoves) {
              targets.forEach(target => {
                if (validMoves[origin].includes(target)) {
                  next.push([Number(origin), target]);
                }
              })
            }
            return next;
          }, [] as [number, number][]);

          if (mutualValidMoves.length === 1) {
          const [from, to] = mutualValidMoves[0];

          dispatch(movePiece({ from, to }));
        } else if (mutualValidMoves.length === 0) {
          
          const validMoveList = Object.entries(board.validMoves)
            .reduce((next, [origin, targets]) => {
              targets.forEach(target => {
                next.push([Number(origin), target]);
              })
              return next;
            }, [] as [number, number][]);

          const [from, to] = validMoveList[Math.floor(validMoveList.length * Math.random())];

          dispatch(movePiece({ from, to }));
        } else {
          const bestAIMove = await comLinkWorker.getBestMove(
            secondFen,
            4,
            mutualValidMoves.map(fenMovesToEngineMoves),
          );

          const [from, to] = getBestMoveFromEngine(bestAIMove);

          dispatch(movePiece({ from, to }));
        }
      }
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
  promote,
} = boardSlice.actions

export const boardSelector = (state: AppState) => state.board

export const isCurrentUserTurn = (state: AppState) => {
  if (currentTurn(state.board.fen) === 'black') {
    if (state.user === state.board.blackPlayer) {
      return true;
    }
  } else if (state.user === state.board.whitePlayer) {
    return true;
  }
  return false;
};

export default boardSlice.reducer

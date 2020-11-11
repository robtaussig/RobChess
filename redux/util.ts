import Chess from 'chess.js';
import { GameTypes, Moment } from './board';

export const makeMove = (
  board: string,
  from: number,
  to: number,
  promoteTo?: string,
): {
  fen: string,
  validMoves: { [pos: number]: number[] },
  isPromotion: boolean,
} => {
  const game = new Chess(board);
  const fromNotation = game.SQUARES[from];
  const toNotation = game.SQUARES[to];
  let isPromotion = false;
  if (promoteTo) {
    game.move({ from: fromNotation, to: toNotation, promotion: promoteTo });
  } else {
    if (
      game.get(fromNotation)?.type === 'p' &&
      (to > 55 || to < 8)
    ) {
      isPromotion = true;
    } else {
      game.move({ from: fromNotation, to: toNotation });
    }
  }
  const nextBoard = game.fen();
  return {
    fen: nextBoard,
    validMoves: getValidMoves(nextBoard),
    isPromotion,
  };
};

export const getValidMoves = (board: string): { [pos: number]: number[] } => {
  const game = new Chess(board);
  const legalMoves: { [pos: number]: number[] } = {};
  const NOTATION_MAP = (game.SQUARES as string[]).reduce((next, square, idx) => {
    next[square] = idx;
    return next;
  }, {} as { [notation: string]: number });

  const moves = game.moves({ verbose: true });
  moves.forEach(({ from, to }) => {
    const fromNum = NOTATION_MAP[from];
    const toNum = NOTATION_MAP[to];
    legalMoves[fromNum] = legalMoves[fromNum] || [];
    legalMoves[fromNum].push(toNum);
  });

  return legalMoves;
};

const initChaosChess = (difficulty?: number): {
  fen: string,
  validMoves: { [pos: number]: number[] },
  history: Moment[],
  lastMove: [number, number],
} => {
  const game = new Chess();
  const NOTATION_MAP = (game.SQUARES as string[]).reduce((next, square, idx) => {
    next[square] = idx;
    return next;
  }, {} as { [notation: string]: number });
  const history: Moment[] = [];
  let lastMove = null;
  for (let i = 0; i < (110 - (difficulty * 10)); i++) {
    const validMoves = game.moves({ verbose: true });
    const nextMove = validMoves[Math.floor(validMoves.length * Math.random())];
    const fromNum = NOTATION_MAP[nextMove.from];
    const toNum = NOTATION_MAP[nextMove.to];
    let move = [fromNum, toNum];
    history.push({
      fen: game.fen(),
      move: lastMove,
    });
    game.move(nextMove);
    lastMove = move;
  }
  const fen = game.fen();

  return {
    fen,
    validMoves: getValidMoves(fen),
    history,
    lastMove,
  };
};

export const initGame = (gameType?: GameTypes, difficulty?: number): {
  fen: string,
  validMoves: { [pos: number]: number[] },
  history: Moment[],
  lastMove: [number, number],
} => {
  if (gameType === GameTypes.Chaos) {
    return initChaosChess(difficulty);
  }

  const game = new Chess();
  const fen = game.fen();
  return {
    fen,
    validMoves: getValidMoves(fen),
    history: [],
    lastMove: null,
  };
};

export const currentTurn = (fen: string): 'white' | 'black' => {
  if (!fen) return null;

  const [, color] = fen.split(' ');
  return color === 'w' ? 'white' : 'black';
};

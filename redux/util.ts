import Chess from 'chess.js';

export const makeMove = (board: string, from: number, to: number): {
  fen: string, validMoves: { [pos: number]: number[] },
} => {
  const game = new Chess(board);
  const fromNotation = game.SQUARES[from];
  const toNotation = game.SQUARES[to];
  game.move({ from: fromNotation, to: toNotation });
  const nextBoard = game.fen();
  return {
    fen: nextBoard,
    validMoves: getValidMoves(nextBoard),
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

export const initGame = (): {
  fen: string, validMoves: { [pos: number]: number[] },
} => {
  const game = new Chess();
  const fen = game.fen();
  return {
    fen,
    validMoves: getValidMoves(fen),
  };
};

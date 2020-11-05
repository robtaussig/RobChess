import { expose } from 'comlink';
import {
  getBestMove as getBestMoveEngine,
  fenToBoard,
  isCheck as isCheckEngine,
} from 'robtaussig_chess_engine';
import {
  getBoardMap,
  toFenMove,
} from './openings/openings';

export interface WorkerInterface {
  getBestMove: typeof getBestMove,
  getBoardMap: typeof getBoardMap,
  isCheck: typeof isCheck,
}

const isCheck = (board: string): boolean => {
  return isCheckEngine(fenToBoard(board));
};

const boardMap = getBoardMap();

const getBestMove = (board: string, depth: number = 4, limitMoves?: string[]): [number, string] => {
  const [newBoard, color] = board.split(' ');
  const combined = `${newBoard} ${color}`;
  const limitedFenMoves = limitMoves?.map(toFenMove);

  const openingMoves = boardMap[combined]?.filter(move => {
    return limitedFenMoves ?
      limitedFenMoves.includes(move) :
      true;
  });

  if (openingMoves?.length > 0) {
    return openingMoves[Math.floor(openingMoves.length * Math.random())];
  }

  return getBestMoveEngine(fenToBoard(board), depth, false, -Infinity, Infinity, true, null, limitMoves);
};

expose({
  getBestMove,
  getBoardMap,
  isCheck,
});

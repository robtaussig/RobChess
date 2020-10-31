import { expose } from 'comlink';
import {
  getBestMove as getBestMoveEngine,
  fenToBoard,
} from 'robtaussig_chess_engine';
import {
  getBoardMap,
} from './openings/openings';

export interface WorkerInterface {
  getBestMove: typeof getBestMoveEngine,
  getBoardMap: typeof getBoardMap,
}

const boardMap = getBoardMap();

const getBestMove = (board: string, depth: number = 4): [number, string] => {
  const [newBoard, color] = board.split(' ');
  const combined = `${newBoard} ${color}`;
  if (boardMap[combined]) {
    return boardMap[combined][Math.floor(boardMap[combined].length * Math.random())];
  }

  return getBestMoveEngine(fenToBoard(board), depth);
};

expose({
  getBestMove,
  getBoardMap,
});

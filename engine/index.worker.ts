import { expose } from 'comlink';
import {
  getBestMove,
} from 'robtaussig_chess_engine';

export interface WorkerInterface {
  getBestMove: typeof getBestMove
}

expose({
  getBestMove,
});

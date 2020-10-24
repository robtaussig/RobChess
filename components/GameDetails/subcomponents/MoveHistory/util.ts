import Chess from 'chess.js';
import { Moment } from '../../../../redux/board';

export const convertMoveHistory = (moveHistory: Moment[], lastMove: [number, number]): string[] => {
    const chess = new Chess();
    moveHistory.concat({ fen: null, move: lastMove }).forEach(({ move }) => {
        if (move) {
            const [from, to] = move;
            chess.move({ from: chess.SQUARES[from], to: chess.SQUARES[to] });
        }
    });
    return chess.history();
};

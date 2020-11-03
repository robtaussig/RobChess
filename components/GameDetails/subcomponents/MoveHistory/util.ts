import Chess from 'chess.js';
import { Moment } from '../../../../redux/board';

export const convertMoveHistory = (moveHistory: Moment[], moveFuture: Moment[], lastMove: [number, number, string?]): string[] => {
    const chess = new Chess();
    moveHistory.concat({ fen: null, move: lastMove }).concat(moveFuture).forEach(({ move }) => {
        if (move) {
            const [from, to, promotion] = move;
            if (promotion) {
                chess.move({ from: chess.SQUARES[from], to: chess.SQUARES[to], promotion });
            } else {
                chess.move({ from: chess.SQUARES[from], to: chess.SQUARES[to] });
            }
        }
    });
    return chess.history();
};

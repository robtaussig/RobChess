import React, { FC, useMemo } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { CapturedCountByPiece } from './types';
import { INITIAL_PIECE_COUNT } from './constants';
import Pieces from './subcomponents/Pieces';

export interface CapturedPiecesProps {
  className?: string;
  board: string;
}

export const CapturedPieces: FC<CapturedPiecesProps> = ({
  className,
  board,
}) => {

  const {
    white, black
  } = useMemo(() => {
    const white: CapturedCountByPiece = {};
    const black: CapturedCountByPiece = {};

    const boardPieces = board
      ?.split(' ')[0]
      .split('/')
      .join('')
      .split('')
      .reduce((next, piece) => {
        next[piece] = next[piece] || 0;
        next[piece]++;
        return next;
      }, {} as CapturedCountByPiece) ?? {};

    Object.entries(INITIAL_PIECE_COUNT).forEach(([piece, count]) => {
      const onBoard = boardPieces[piece] ?? 0;
      const offBoard = count - onBoard;
      if (piece === piece.toUpperCase()) {
        white[piece] = offBoard;
      } else {
        black[piece] = offBoard;
      }
    });
    
    return {
      white,
      black,
    }
  }, [board]);

  return (
    <div className={cn(styles.root, className)}>
      <Pieces className={styles.whitePieces} pieces={white} white/>
      <Pieces className={styles.blackPieces} pieces={black} black/>
    </div>
  );
};

export default CapturedPieces;

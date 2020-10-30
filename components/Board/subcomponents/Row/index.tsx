import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Square from '../Square';
import { User } from '../../../../redux/user';

export interface RowProps {
  className?: string;
  rowIdx: number;
  row: string;
  validMoves: { [pos: number]: number[] };
  isMovingFrom: number;
  isMovingOver: number;
  lastMove: [number, number];
  user: User;
  whitePlayer: User;
  blackPlayer: User;
  moveTo: (pos?: number) => void;
}

export const Row: FC<RowProps> = ({
  className,
  rowIdx,
  row,
  validMoves,
  isMovingFrom,
  isMovingOver,
  lastMove,
  user,
  whitePlayer,
  blackPlayer,
  moveTo,
}) => {
  const squares = row.split('').reduce((next, unit) => {
    if (!Number.isNaN(Number(unit))) {
      next += new Array(Number(unit)).fill('-').join('');
    } else {
      next += unit;
    }
    return next;
  }, '').split('');

  return (
    <div className={cn(styles.root, className)}>
      {squares.map((piece, idx) => {
        const pos = rowIdx * 8 + idx;
        const isValidTarget = isMovingFrom && validMoves[isMovingFrom]?.includes(pos);
        return (
          <Square
            key={`${idx}-square`}
            squareColor={rowIdx % 2 === idx % 2 ? 'white' : 'black'}
            pos={pos}
            piece={piece}
            validMoves={validMoves}
            isMovingFrom={isMovingFrom === pos}
            isMovingOver={isMovingOver === pos}
            isValidTarget={isValidTarget}
            moveOrigin={isMovingFrom}
            wasLastMove={lastMove?.[0] === pos || lastMove?.[1] === pos}
            user={user}
            whitePlayer={whitePlayer}
            blackPlayer={blackPlayer}
            moveTo={moveTo}
          />
        );
      })}
    </div>
  );
};

export default Row;

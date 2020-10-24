import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Piece from '../Piece';
import { movingFrom, moveTo } from '../../../../redux/board';

export interface SquareProps {
  className?: string;
  squareColor: 'white' | 'black';
  pos: number;
  piece: string;
  validMoves: { [pos: number]: number[] };
  isMovingFrom: boolean;
  isMovingOver: boolean;
  isValidTarget: boolean;
  wasLastMove: boolean;
  moveOrigin: number;
}

export const Square: FC<SquareProps> = ({
  className,
  squareColor,
  pos,
  piece,
  validMoves,
  isMovingFrom,
  isMovingOver,
  isValidTarget,
  wasLastMove,
  moveOrigin,
}) => {
  const dispatch = useDispatch();

  return (
    <div
      className={cn(styles.root, className, {
        [styles.validBlackSquare]: isValidTarget && squareColor === 'black',
        [styles.validWhiteSquare]: isValidTarget && squareColor === 'white',
        [styles.wasLastMove]: wasLastMove,
        [styles.blackSquare]: squareColor === 'black',
        [styles.whiteSquare]: squareColor === 'white',
        [styles.movingFrom]: isMovingFrom,
        [styles.isMovingOver]: isMovingOver,
      })}
      onClick={() => {
        if (
          moveOrigin !== null &&
          moveOrigin !== pos &&
          validMoves[moveOrigin]?.includes(pos)
        ) {
          dispatch(moveTo(pos));
        }
      }}
    >
      <Piece
        piece={piece}
        canMove={pos in validMoves}
        onClickPiece={() => dispatch(movingFrom(pos))}
        onMove={() => dispatch(moveTo())}
      />
    </div>
  );
};

export default Square;

import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Piece from '../Piece';
import { Moment } from '../../../../redux/board';
import { User } from '../../../../redux/user';

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
  user: User;
  whitePlayer: User;
  blackPlayer: User;
  moveTo: (pos?: number) => void;
  onMovingFrom: (pos: number) => void;
  isLive: boolean;
  future: Moment[];
  onPremove: (coors: { x: number, y: number}) => void;
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
  user,
  whitePlayer,
  blackPlayer,
  moveTo,
  isLive,
  future,
  onPremove,
  onMovingFrom,
}) => {

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
          moveTo(pos);
        } else if (!validMoves[pos]) {
          onMovingFrom(null);
        }
      }}
    >
      <Piece
        piece={piece}
        canMove={pos in validMoves && (future.length === 0 || !isLive)}
        onClickPiece={() => onMovingFrom(pos)}
        onMove={() => moveTo()}
        user={user}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        onPremove={onPremove}
      />
    </div>
  );
};

export default Square;

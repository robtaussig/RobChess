import React, { FC, useRef } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import clamp from 'lodash/clamp';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import { PIECE_TO_CSS } from './constants';
import { User } from '../../../../redux/user';

export interface PieceProps {
  className?: string;
  piece: string;
  canMove: Boolean;
  onClickPiece: (event: any) => void;
  onMove: () => void;
  user: User;
  whitePlayer: User;
  blackPlayer: User;
  onPremove: (event: any) => void;
}

export const Piece: FC<PieceProps> = ({
  className,
  piece,
  canMove,
  onClickPiece,
  onMove,
  user,
  whitePlayer,
  blackPlayer,
  onPremove,
}) => {
  const canMoveRef = useRef(null);
  const isBlack = piece === piece.toLowerCase();
  canMoveRef.current = canMove &&
    (
      isBlack && user === blackPlayer ||
      !isBlack && user === whitePlayer
    );
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture(({ down, delta, velocity, first, event }) => {
    velocity = clamp(velocity, 1, 8);
    set({
      xy: down ?
        delta :
        [0, 0],
      config: {
        mass: velocity,
        tension: 600 * velocity,
        friction: 50,
      },
    });
    if (canMoveRef.current && first) {
      onClickPiece(event);
    } else if (!first && !down) {
      if (canMoveRef.current) {
        onMove();
      } else {
        onPremove(event);
      }
    }
  });

  if (piece === '-') {
    return <i
      {...bind()}
      className={cn(styles.root, className)}
      style={{
        //@ts-ignore
        transform: xy?.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
        touchAction: 'none',
        display: 'flex',
      }}
    />;
  }
  
  const pieceColor = isBlack ?
    styles.black :
    styles.white;

  return (
    <animated.i
      {...bind()}
      style={{
        //@ts-ignore
        transform: xy?.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
        touchAction: 'none',
        display: 'flex',
      }}
      className={cn(styles.root, className, pieceColor, PIECE_TO_CSS[piece])}
    />
  );
};

export default Piece;

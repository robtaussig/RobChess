import React, { FC, useRef } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import clamp from 'lodash/clamp';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-with-gesture';

export interface PieceProps {
  className?: string;
  piece: string;
  canMove: Boolean;
  onClickPiece: any;
  onMove: any;
}

export const Piece: FC<PieceProps> = ({
  className,
  piece,
  canMove,
  onClickPiece,
  onMove,
}) => {
  const canMoveRef = useRef(null);
  canMoveRef.current = canMove;
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
    } else if (canMoveRef.current && !down) {
      onMove(event);
    }
  });

  if (piece === '-') {
    return null;
  }
  
  const pieceColor = piece === piece.toLowerCase() ? styles.black : styles.white;

  return (
    <animated.div
      {...bind()}
      onDragEnd={console.log}
      style={{
        //@ts-ignore
        transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
        touchAction: 'none',
      }}
      className={cn(styles.root, className, pieceColor)}
    >
      {piece}
    </animated.div>
  );
};

export default Piece;

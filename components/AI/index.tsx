import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import { init, moveTo, resign, draw, boardSelector, movePiece } from '../../redux/board';
import { currentTurn } from '../../redux/util';
import { userSelector } from '../../redux/user';

export interface AIProps {
  className?: string;
}

export const AI: FC<AIProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const {
    fen,
    premoves,
    validMoves,
    whitePlayer,
    blackPlayer,
  } = useSelector(boardSelector);

  useEffect(() => {
    dispatch(init());
  }, []);

  const handleMove = (pos?: number) => {
    dispatch(moveTo(pos));
  };

  const handleResign = () => {
    dispatch(resign(true));
  };
  
  const handleDraw = () => {
    dispatch(draw(true));
  };

  useEffect(() => {
    if (fen) {
      const color = currentTurn(fen);
      const isCurrentTurn = (
        (color === 'white' && whitePlayer === user) ||
        (color === 'black' && blackPlayer === user)
      );
      if (isCurrentTurn) {
        for (let { from, to } of premoves) {
          if (validMoves[from] && validMoves[from].includes(to)) {
            dispatch(movePiece({ from, to }));
            return;
          }
        }
      }
    }
  }, [
    fen,
    premoves,
    validMoves,
    whitePlayer,
    blackPlayer,
    user,
  ]);

  return (
    <div className={cn(styles.root, className)}>
      <Board
        className={styles.board}
        moveTo={handleMove}
      />
      <GameDetails
        className={styles.details}
        onResign={handleResign}
        onDraw={handleDraw}
      />
    </div>
  );
};

export default AI;

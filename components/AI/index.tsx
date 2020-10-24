import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import { boardSelector, init } from '../../redux/board';
import { userSelector } from '../../redux/user';
import { opponentSelector } from '../../redux/opponent';

export interface AIProps {
  className?: string;
}

export const AI: FC<AIProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const { fen, validMoves, history, future, isMovingFrom, isMovingOver, lastMove } = useSelector(boardSelector);
  const user = useSelector(userSelector);
  const opponent = useSelector(opponentSelector);

  useEffect(() => {
    dispatch(init({
      name: 'AI',
      rating: 1200,
    }));
  }, []);

  return (
    <div className={cn(styles.root, className)}>
      <h1 className={styles.header}>Vs AI</h1>
      {fen && <Board
        className={styles.board}
        validMoves={validMoves}
        board={fen}
        isMovingOver={isMovingOver}
        isMovingFrom={isMovingFrom}
        lastMove={lastMove}
      />}
      <GameDetails
        className={styles.details}
        board={fen}
        lastMove={lastMove}
        history={history}
        future={future}
        whitePlayer={user}
        blackPlayer={opponent}
        user={user}
      />
    </div>
  );
};

export default AI;

import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import { boardSelector, init } from '../../redux/board';

export interface AIProps {
  className?: string;
  
}

export const AI: FC<AIProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const { fen, validMoves } = useSelector(boardSelector);
  const moveHistory = [];

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <div className={cn(styles.root, className)}>
      <h1 className={styles.header}>Vs AI</h1>
      {fen && <Board
        className={styles.board}
        validMoves={validMoves}
        board={fen}
      />}
      <GameDetails
        className={styles.details}
        board={fen}
        moveHistory={moveHistory}
        whitePlayer={null}
        blackPlayer={null}
        user={null}
      />
    </div>
  );
};

export default AI;

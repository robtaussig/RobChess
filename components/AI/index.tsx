import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import { init } from '../../redux/board';

export interface AIProps {
  className?: string;
}

export const AI: FC<AIProps> = ({
  className,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <div className={cn(styles.root, className)}>
      <Board
        className={styles.board}
      />
      <GameDetails
        className={styles.details}
      />
    </div>
  );
};

export default AI;

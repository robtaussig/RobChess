import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import { init, moveTo, resign, draw } from '../../redux/board';
import { userSelector } from '../../redux/user';

export interface AIProps {
  className?: string;
}

export const AI: FC<AIProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

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

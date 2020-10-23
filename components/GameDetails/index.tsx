import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User } from '../../redux/user';

export interface GameDetailsProps {
  className?: string;
  board: string;
  moveHistory: string[];
  whitePlayer: any;
  blackPlayer: any;
  user: User;
}

export const GameDetails: FC<GameDetailsProps> = ({
  className,
  board,
  moveHistory,
  whitePlayer,
  blackPlayer,
  user,
}) => {

  return (
    <div className={cn(styles.root, className)}>

    </div>
  );
};

export default GameDetails;

import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User } from '../../redux/user';
import { Moment } from '../../redux/board';
import TimeTravelButtons from './subcomponents/TimeTravelButtons';

export interface GameDetailsProps {
  className?: string;
  board: string;
  history: Moment[];
  future: Moment[];
  whitePlayer: any;
  blackPlayer: any;
  user: User;
}

export const GameDetails: FC<GameDetailsProps> = ({
  className,
  board,
  history,
  future,
  whitePlayer,
  blackPlayer,
  user,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <TimeTravelButtons
        className={styles.timeTravelButtons}
        hasFuture={future.length > 0}
        hasHistory={history.length > 0}
      />
    </div>
  );
};

export default GameDetails;

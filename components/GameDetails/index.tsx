import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User } from '../../redux/user';
import { Moment } from '../../redux/board';
import TimeTravelButtons from './subcomponents/TimeTravelButtons';
import GameActions from './subcomponents/GameActions';
import CapturedPieces from './subcomponents/CapturedPieces';
import MoveHistory from './subcomponents/MoveHistory';
import PlayerDetails from './subcomponents/PlayerDetails';

export interface GameDetailsProps {
  className?: string;
  board: string;
  history: Moment[];
  future: Moment[];
  whitePlayer: User;
  blackPlayer: User;
  lastMove: [number, number];
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
  lastMove,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <PlayerDetails
        className={styles.playerDetails}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        user={user}
      />
      <GameActions
        className={styles.gameActions}
      />
      <CapturedPieces
        className={styles.capturedPieces}
        board={board}
      />
      <MoveHistory
        className={styles.moveHistory}
        history={history}
        lastMove={lastMove}
      />
      <TimeTravelButtons
        className={styles.timeTravelButtons}
        hasFuture={future.length > 0}
        hasHistory={history.length > 0}
      />
    </div>
  );
};

export default GameDetails;

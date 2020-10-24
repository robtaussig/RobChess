import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import TimeTravelButtons from './subcomponents/TimeTravelButtons';
import GameActions from './subcomponents/GameActions';
import CapturedPieces from './subcomponents/CapturedPieces';
import MoveHistory from './subcomponents/MoveHistory';
import PlayerDetails from './subcomponents/PlayerDetails';

export interface GameDetailsProps {
  className?: string;
}

export const GameDetails: FC<GameDetailsProps> = ({
  className,
}) => {
  return (
    <div className={cn(styles.root, className)}>
      <PlayerDetails className={styles.playerDetails} />
      <GameActions className={styles.gameActions} />
      <CapturedPieces className={styles.capturedPieces} />
      <MoveHistory className={styles.moveHistory} />
      <TimeTravelButtons className={styles.timeTravelButtons} />
    </div>
  );
};

export default GameDetails;

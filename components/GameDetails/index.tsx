import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import GameActions from './subcomponents/GameActions';
import CapturedPieces from './subcomponents/CapturedPieces';
import MoveHistory from './subcomponents/MoveHistory';
import PlayerDetails from './subcomponents/PlayerDetails';

export interface GameDetailsProps {
  className?: string;
  onResign: () => void;
  onDraw: () => void;
}

export const GameDetails: FC<GameDetailsProps> = ({
  className,
  onResign,
  onDraw,
}) => {
  return (
    <div className={cn(styles.root, className)}>
      <PlayerDetails className={styles.playerDetails} />
      <GameActions
        className={styles.gameActions}
        onResign={onResign}
        onDraw={onDraw}
      />
      <CapturedPieces className={styles.capturedPieces} />
      <MoveHistory className={styles.moveHistory} />
    </div>
  );
};

export default GameDetails;

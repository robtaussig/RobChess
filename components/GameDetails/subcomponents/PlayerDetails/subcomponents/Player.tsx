import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { User } from '../../../../../redux/user';

export interface PlayerProps {
  className?: string;
  player: User;
  white?: boolean;
  black?: boolean;
  canUnseat: boolean;
  onClaimSeat: (color: 'white' | 'black') => void;
  onAssignAI: (color: 'white' | 'black') => void;
  onUnseat: (color: 'white' | 'black') => void;
}

export const Player: FC<PlayerProps> = ({
  className,
  player,
  white = false,
  black = false,
  onClaimSeat,
  onAssignAI,
  canUnseat,
  onUnseat,
}) => {
  if (!player) {
    return (
      <div
        className={cn(styles.root, className)}
      >
        <button
          className={styles.claimSeat}
          onClick={() => onClaimSeat(white ? 'white' : 'black')}
        >
          Claim seat
        </button>
        <button
          className={styles.assignAI}
          onClick={() => onAssignAI(white ? 'white' : 'black')}
        >
          Assign AI
        </button>
      </div>
    );
  }

  return (
    <div className={cn(styles.root, className, {
      [styles.white]: white,
      [styles.black]: black,
    })}>
      <span className={styles.name}>{player.name}</span>
      <span className={styles.rating}>{player.rating}</span>
      {canUnseat && (
        <button
          className={styles.unseatButton}
          onClick={() => onUnseat(white ? 'white' : 'black')}
        >
          Unseat
        </button>
      )}
    </div>
  );
};

export default Player;

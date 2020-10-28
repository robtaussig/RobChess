import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { User } from '../../../../../redux/user';
import { PIECE_TO_CSS } from '../../../../Board/subcomponents/Piece/constants';
import { AI_PLAYER, makeEngineMove } from '../../../../../redux/board';

export interface PlayerProps {
  className?: string;
  player: User;
  white?: boolean;
  black?: boolean;
  canUnseat: boolean;
  currentTurn: boolean;
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
  currentTurn,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (player === AI_PLAYER && currentTurn) {
      dispatch(makeEngineMove());
    }
  }, [currentTurn, player]);

  if (!player) {
    return (
      <div
        className={cn(styles.root, className, styles.unclaimed)}
      >
        <i
          className={cn(styles.piece, PIECE_TO_CSS['k'], {
            [styles.white]: white,
            [styles.black]: black,
          })}
        />
        <button
          className={styles.claimSeat}
          onClick={() => onClaimSeat(white ? 'white' : 'black')}
        >
          Claim
        </button>
        <button
          className={styles.assignAI}
          onClick={() => onAssignAI(white ? 'white' : 'black')}
        >
          AI
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
      <span className={styles.rating}>({player.rating})</span>
      {canUnseat && (
        <button
          className={styles.unseatButton}
          onClick={() => onUnseat(white ? 'white' : 'black')}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Player;

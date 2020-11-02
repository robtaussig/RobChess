import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { PlayerState } from '../../../../../../redux/board';

export interface OptionsProps {
  className?: string;
  playerState: PlayerState;
  opponentState: PlayerState;
  onPlayAgain: () => void;
  onGoBack: () => void;
  onAcceptDraw: () => void;
}

export const Options: FC<OptionsProps> = ({
  className,
  playerState,
  opponentState,
  onPlayAgain,
  onGoBack,
  onAcceptDraw,
}) => {
  const [leftCallback, leftText]: [() => void, string] =
    opponentState === PlayerState.OfferedDraw ?
      [onAcceptDraw, 'Accept Draw'] :
      (
        opponentState === PlayerState.Resigned ||
        opponentState === PlayerState.Rematch ||
        playerState === PlayerState.Resigned
      ) ?
        [onPlayAgain, 'Play again'] :
        [onGoBack, 'Go back'];
  const [rightCallback, rightText]: [() => void, string] =
    opponentState === PlayerState.OfferedDraw ?
      [onAcceptDraw, 'Decline'] :
      (
        opponentState === PlayerState.Resigned ||
        opponentState === PlayerState.Rematch
      ) ?
        [onPlayAgain, 'Go back'] :
        [onGoBack, 'Go back'];
  
  return (
    <div className={cn(styles.root, className)}>
      {leftCallback && (
        <button
          className={styles.leftButton}
          onClick={leftCallback}
        >
          {leftText}
        </button>
      )}
      {rightCallback && (
        <button
          className={styles.rightButton}
          onClick={rightCallback}
        >
          {rightText}
        </button>
      )}
    </div>
  );
};

export default Options;

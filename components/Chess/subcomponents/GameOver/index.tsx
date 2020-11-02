import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { PlayerState } from '../../../../redux/board';
import Message from './subcomponents/Message';
import Options from './subcomponents/Options';

export interface GameOverProps {
  className?: string;
  playerState: PlayerState;
  opponentState: PlayerState;
  onPlayAgain: () => void;
  onGoBack: () => void;
  onDraw: () => void;
}

export const GameOver: FC<GameOverProps> = ({
  className,
  playerState,
  opponentState,
  onPlayAgain,
  onGoBack,
  onDraw,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <Message
        className={styles.message}
        playerState={playerState}
        opponentState={opponentState}
      />
      <Options
        className={styles.options}
        playerState={playerState}
        opponentState={opponentState}
        onPlayAgain={onPlayAgain}
        onGoBack={onGoBack}
        onAcceptDraw={onDraw}
      />
    </div>
  );
};

export default GameOver;

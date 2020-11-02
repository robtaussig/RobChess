import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { PlayerState } from '../../../../../../redux/board';

export interface MessageProps {
  className?: string;
  playerState: PlayerState;
  opponentState: PlayerState;
}

export const Message: FC<MessageProps> = ({
  className,
  playerState,
  opponentState,
}) => {
  const messageText = playerState === PlayerState.Resigned ?
    'You resigned' :
    opponentState === PlayerState.Resigned ?
      'Your opponent resigned' :
      opponentState === PlayerState.Left ?
        'Your opponent left' :
        opponentState === PlayerState.Rematch ?
          'Your opponent wants a rematch' :
          opponentState === PlayerState.OfferedDraw ?
            'Your opponent offered a draw' :
            'Nothing happened';
  return (
    <p className={cn(styles.root, className)}>
      {messageText}
    </p>
  );
};

export default Message;

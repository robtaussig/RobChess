import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import { init } from '../../redux/board';
import { named } from '../../redux/user';
import { networkSelector, RoomJoinStatus, joining, MAIN_ROOM } from '../../redux/network';
import { WS_ADDR, Messages } from './constants';
import useWebsocket from 'react-use-websocket';
import { handleMessage } from '../../redux/message-handler';
import { v4 as uuidv4 } from 'uuid';
import OpponentFinder from '../OpponentFinder';

export interface PlayProps {
  className?: string;
}

export const Play: FC<PlayProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const {
    room,
    status,
  } = useSelector(networkSelector);

  const {
    sendMessage,
    lastMessage,
  } = useWebsocket(WS_ADDR, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 100,
    reconnectInterval: 5000,
  });

  useEffect(() => {
    dispatch(init());
  }, []);

  useEffect(() => {
    if (status === RoomJoinStatus.None) {
      dispatch(joining(room));
      sendMessage(`/join ${room}`);
    } else if (status === RoomJoinStatus.Joined) {
      const name = uuidv4();
      dispatch(named(name));
      sendMessage(`/name ${name}`);
      sendMessage(`${Messages.Broadcast}${Messages.GetUsers}`);
    }
  }, [status, room]);

  useEffect(() => {
    if (lastMessage?.data) {
      dispatch(handleMessage(lastMessage.data, sendMessage));
    }
  }, [lastMessage]);

  return (
    <div className={cn(styles.root, className)}>
      <Board
        className={styles.board}
      />
      {room === MAIN_ROOM ? (
        <OpponentFinder
          className={styles.opponentFinder}
        />
      ) : (
        <GameDetails
          className={styles.details}
        />
      )}
    </div>
  );
};

export default Play;

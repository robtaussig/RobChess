import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import { init } from '../../redux/board';
import { named, userSelector } from '../../redux/user';
import { networkSelector, RoomJoinStatus, joining, MAIN_ROOM, invite, invitedBy as invitedByAction } from '../../redux/network';
import { WS_ADDR, Messages } from './constants';
import useWebsocket from 'react-use-websocket';
import { handleMessage, sendTo } from '../../redux/message-handler';
import { v4 as uuidv4 } from 'uuid';
import OpponentFinder from '../OpponentFinder';
import ChallengedMessage from './subcomponents/ChallengedMessage';

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
    inviting,
    invitedBy,
  } = useSelector(networkSelector);
  const {
    name,
  } = useSelector(userSelector);
  const {
    sendMessage,
    lastMessage,
  } = useWebsocket(WS_ADDR, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 100,
    reconnectInterval: 5000,
  });

  const handleAcceptChallenge = () => {

  };

  const handleRejectChallenge = () => {
    dispatch(invitedByAction(null));
    sendTo(invitedBy, sendMessage, {
      type: Messages.Action,
      payload: {
        type: invite.type,
        payload: null,
      }
    });
  };


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

  useEffect(() => {
    if (inviting) {
      sendTo(inviting, sendMessage, {
        type: Messages.Action,
        payload: {
          type: invitedByAction.type,
          payload: name,
        }
      });
    }
  }, [inviting, name]);

  return (
    <div className={cn(styles.root, className)}>
      <Board
        className={styles.board}
      />
      {invitedBy ? (
        <ChallengedMessage
          className={styles.challengedMessage}
          by={invitedBy}
          onAccept={handleAcceptChallenge}
          onReject={handleRejectChallenge}
        />
      ) : room === MAIN_ROOM ? (
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

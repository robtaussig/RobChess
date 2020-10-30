import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import {
  init,
  boardSelector,
  moveTo,
  resign,
  draw,
  PlayerState,
  movePiece,
} from '../../redux/board';
import { currentTurn } from '../../redux/util';
import { named, userSelector } from '../../redux/user';
import {
  networkSelector,
  RoomJoinStatus,
  joining,
  MAIN_ROOM,
  invite,
  invitedBy as invitedByAction,
  acceptedInvite,
} from '../../redux/network';
import { WS_ADDR, Messages } from './constants';
import useWebsocket from 'react-use-websocket';
import {
  handleMessage,
  sendTo,
  propagateMove,
  whiteClaimed,
  blackClaimed,
  propagateResignation,
  propagatePreMove,
} from '../../redux/message-handler';
import { v4 as uuidv4 } from 'uuid';
import OpponentFinder from '../OpponentFinder';
import ChallengedMessage from './subcomponents/ChallengedMessage';
import GameOver from './subcomponents/GameOver';

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
  const user = useSelector(userSelector);
  const {
    whitePlayer,
    blackPlayer,
    playerState,
    opponentState,
    fen,
    premoves,
    validMoves,
  } = useSelector(boardSelector);
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
    dispatch(acceptedInvite(invitedBy));
    sendTo(invitedBy, sendMessage, {
      type: Messages.Action,
      payload: {
        type: acceptedInvite.type,
        payload: invitedBy,
      }
    });
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

  const handleMove = (pos?: number) => {
    dispatch(propagateMove(sendMessage, pos));
    dispatch(moveTo(pos));
  };

  const handleResign = () => {
    dispatch(resign(true));
    dispatch(propagateResignation(sendMessage));
  };

  const handleDraw = () => {

  };

  const handlePlayAgain = () => {
    dispatch(init());
  };

  const handleGoBack = () => {
    dispatch(init());
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
      return () => sendMessage(`${Messages.Broadcast}${Messages.Leaving}`);
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
          payload: user.name,
        }
      });
    }
  }, [inviting, user.name]);

  useEffect(() => {
    if (whitePlayer?.name === user.name) {
      dispatch(whiteClaimed(true, sendMessage));
      return () => dispatch(whiteClaimed(false, sendMessage));
    }
  }, [whitePlayer?.name === user.name]);

  useEffect(() => {
    if (blackPlayer?.name === user.name) {
      dispatch(blackClaimed(true, sendMessage));
      return () => dispatch(blackClaimed(false, sendMessage));
    }
  }, [blackPlayer?.name === user.name]);

  useEffect(() => {
    if (fen) {
      const color = currentTurn(fen);
      const isCurrentTurn = (
        (color === 'white' && whitePlayer === user) ||
        (color === 'black' && blackPlayer === user)
      );
      if (isCurrentTurn) {
        for (let { from, to } of premoves) {
          if (validMoves[from] && validMoves[from].includes(to)) {
            dispatch(movePiece({ from, to }));
            dispatch(propagatePreMove(sendMessage, from, to));
            return;
          }
        }
      }
    }
  }, [
    fen,
    premoves,
    validMoves,
    whitePlayer,
    blackPlayer,
    user,
  ]);

  return (
    <div className={cn(styles.root, className)}>
      <Board
        className={styles.board}
        moveTo={handleMove}
        isLive
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
      ) : opponentState === PlayerState.Resigned ||
          playerState === PlayerState.Resigned ? (
        <GameOver
          className={styles.gameOver}
          opponentState={opponentState}
          playerState={playerState}
          onPlayAgain={handlePlayAgain}
          onGoBack={handleGoBack}
          onDraw={handleDraw}
        />
      ) :(
        <GameDetails
          className={styles.details}
          onResign={handleResign}
          onDraw={handleDraw}
        />
      )}
    </div>
  );
};

export default Play;

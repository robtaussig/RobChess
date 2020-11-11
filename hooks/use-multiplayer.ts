import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  init,
  moveTo,
  resign,
  movePiece,
  promote,
  GameTypes,
} from '../components/../redux/board';
import { currentTurn } from '../components/../redux/util';
import { named, userSelector, User } from '../components/../redux/user';
import {
  networkSelector,
  RoomJoinStatus,
  joining,
  invite,
  invitedBy as invitedByAction,
  acceptedInvite,
} from '../components/../redux/network';
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
  propagatePromotion,
} from '../components/../redux/message-handler';
import { v4 as uuidv4 } from 'uuid';

export const useMultiplayer = (
  fen: string,
  premoves: {
    from: number;
    to: number;
  }[],
  validMoves: {
    [pos: number]: number[];
  },
  whitePlayer: User,
  blackPlayer: User,
  gameType: GameTypes = GameTypes.Chess,
) => {
  const dispatch = useDispatch();
  const {
    room,
    status,
    inviting,
    invitedBy,
  } = useSelector(networkSelector);
  const user = useSelector(userSelector);

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

  const movePieceAndPropagate = useCallback((from: number, to: number) => {
    dispatch(movePiece({ from, to }));
    dispatch(propagatePreMove(sendMessage, from, to));
  }, []);

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

  const handlePromote = (piece: string) => {
    dispatch(promote(piece));
    dispatch(propagatePromotion(sendMessage, piece));
  };

  useEffect(() => {
    dispatch(init({ type: gameType }));
  }, [gameType]);

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
            movePieceAndPropagate(from, to);
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

  return {
    handleAcceptChallenge,
    handleRejectChallenge,
    handleMove,
    handleResign,
    handleDraw,
    handlePlayAgain,
    handleGoBack,
    movePieceAndPropagate,
    handlePromote,
  };
};

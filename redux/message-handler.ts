import { ThunkAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { joined, addUser, disconnected } from './network';
import { movePiece, claimSeat } from './board';
import { Messages } from '../components/Play/constants';

type Thunk = ThunkAction<void, AppState, void, any>;
type SendMessage = (message: string) => void;

const is = (type: Messages, message: string): boolean => {
  return message.indexOf(type) > -1;
};

const isTo = (message: string, name: string): boolean => {
  const matchRegex = /\[\[To\]\]\<([^>]*)\>/.exec(message);
  if (matchRegex && matchRegex[1] === name) {
    return true;
  }
  return false;
};

const get = (type: Messages, message: string): [string, string] => {
  const [user, content] = message.split(type);

  return [
    user.replace(':', '').trim(),
    content
  ];
};

export const sendTo = (user: string, sendMessage: SendMessage, payload: any) => {
  sendMessage(`${Messages.To}<${user}><<${JSON.stringify(payload)}>>`);
};

export const propagateMove = (
  sendMessage: SendMessage,
  to?: number,
): Thunk =>
  (dispatch, getState) => {
    const { network, board } = getState();
    network.users.forEach(user => sendTo(user.name, sendMessage, {
      type: Messages.Action,
      payload: {
        type: movePiece.type,
        payload: {
          from: board.isMovingFrom,
          to: to ?? board.isMovingOver,
        },
      }
    }));
  };

export const whiteClaimed = (
  claimed: boolean,
  sendMessage: SendMessage,
): Thunk =>
  (dispatch, getState) => {
    const { network, user: currentUser } = getState();
    network.users.forEach(user => sendTo(user.name, sendMessage, {
      type: Messages.Action,
      payload: {
        type: claimSeat.type,
        payload: {
          user: claimed ? currentUser : null,
          color: 'white',
        },
      }
    }));
  };

export const blackClaimed = (
  claimed: boolean,
  sendMessage: SendMessage,
): Thunk =>
  (dispatch, getState) => {
    const { network, user: currentUser } = getState();
    network.users.forEach(user => sendTo(user.name, sendMessage, {
      type: Messages.Action,
      payload: {
        type: claimSeat.type,
        payload: {
          user: claimed ? currentUser : null,
          color: 'black',
        },
      }
    }));
  };


const respondToGetUsers = (
  userName: string,
  sendMessage: SendMessage,
): Thunk =>
  async (dispatch, getState) => {
    const { user } = getState();
    dispatch(addUser({
      name: userName,
      rating: null,
    }));
    sendTo(userName, sendMessage, {
      type: Messages.Action,
      payload: {
        type: addUser.type,
        payload: user,
      },
    });
  };

export const handleMessage = (
  message: string,
  sendMessage: SendMessage,
): Thunk =>
  async (dispatch, getState) => {
    switch (message) {
      case 'joined':
        dispatch(joined());
        break;
    
      default:
        if (is(Messages.Broadcast, message)) {
          const [user, content] = get(Messages.Broadcast, message);
          switch (content) {
            case Messages.GetUsers:
              dispatch(respondToGetUsers(user, sendMessage));
              break;
            case Messages.Leaving:
              dispatch(disconnected(user));
              break;
            default:
              break;
          }
        } else if (is(Messages.To, message)) {
          const { user } = getState();
          if (isTo(message, user.name)) {
            dispatch(handleMessageTo(message, sendMessage));
          }
        } else if (is(Messages.Disconnected, message)) {
          dispatch(handleDisconnection(message));
        }
        break;
    }
  };

const getPayload = (message: string): any => {
  const payloadRegex = /\<\<([^>]*)\>\>/;
  const matched = payloadRegex.exec(message);
  if (matched?.[1]) return JSON.parse(matched[1]);
};

const handleMessageTo = (
  message: string,
  sendMessage: SendMessage,
): Thunk =>
  (dispatch, getState) => {
    const payload = getPayload(message);
    if (payload?.type === Messages.Action) {
      dispatch(payload.payload);
    }
  };

const handleDisconnection = (
  message: string,
): Thunk =>
  (dispatch, getState) => {
    const [,user] = message.split(Messages.Disconnected);
    dispatch(disconnected(user));
  };

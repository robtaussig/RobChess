import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { User } from './user';

export const MAIN_ROOM = '@RobChess/Main';

export enum RoomJoinStatus {
  None = 'none',
  Joining = 'joining',
  Joined = 'joined',
}
export interface Network {
  room: string;
  users: User[];
  status: RoomJoinStatus;
  inviting: string;
  invitedBy: string;
}

const INITIAL_STATE: Network = {
  room: MAIN_ROOM,
  users: [],
  status: RoomJoinStatus.None,
  inviting: null,
  invitedBy: null,
};

const networkSlice = createSlice({
  name: 'network',
  initialState: INITIAL_STATE,
  reducers: {
    joining(state, action: PayloadAction<string>) {
      state.status = RoomJoinStatus.Joining;
    },
    joined(state) {
      state.status = RoomJoinStatus.Joined;
    },
    invite(state, action: PayloadAction<string>) {
      state.inviting = action.payload;
    },
    invitedBy(state, action: PayloadAction<string>) {
      state.invitedBy = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      if (!state.users.find(({ name }) => {
        return name === action.payload.name;
      })) {
        state.users.push(action.payload);
      }
    },
    acceptedInvite(state, action: PayloadAction<string>) {
      state.invitedBy = null;
      state.inviting = null;
      state.room = action.payload;
      state.status = RoomJoinStatus.None;
      state.users = [];
    },
    disconnected(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user.name !== action.payload);
    },
    reset(state, action) {
      return INITIAL_STATE;
    },
  }
})

export const {
  reset,
  joining,
  joined,
  addUser,
  disconnected,
  invite,
  invitedBy,
  acceptedInvite,
} = networkSlice.actions

export const networkSelector = (state: AppState) => state.network

export default networkSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { setState } from './board';

export interface User {
  name: string;
  rating: number;
  cloned?: boolean;
}

const INITIAL_STATE: User = {
  name: 'Anonymous',
  rating: 1000,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    named(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    reset(state, action) {
      return INITIAL_STATE;
    },
  },
  extraReducers: {
    [setState.type](state, action) {
      return action.payload.user;
    },
  }
})

export const { reset, named } = userSlice.actions

export const userSelector = (state: AppState) => state.user

export default userSlice.reducer

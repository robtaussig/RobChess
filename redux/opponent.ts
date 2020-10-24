import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { User } from './user';
import { init } from './board';

const INITIAL_STATE: User = {
  name: null,
  rating: null,
};

const opponentSlice = createSlice({
  name: 'opponent',
  initialState: INITIAL_STATE,
  reducers: {
    add(state, action) {
      
    },
    reset(state, action) {
      return INITIAL_STATE;
    },
  },
  extraReducers: {
    [init.type](state, action) {
      return action.payload;
    }
  }
})

export const { add, reset } = opponentSlice.actions

export const opponentSelector = (state: AppState) => state.opponent

export default opponentSlice.reducer

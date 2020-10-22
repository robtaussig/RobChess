import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './reducers';

export interface User {
  
}

const INITIAL_STATE: User = {};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    add(state, action) {
      
    },
    reset(state, action) {
      return INITIAL_STATE;
    },
  }
})

export const { add, reset } = userSlice.actions

export const userSelector = (state: AppState) => state.user

export default userSlice.reducer

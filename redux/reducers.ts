import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import boardReducer from './board';

export const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

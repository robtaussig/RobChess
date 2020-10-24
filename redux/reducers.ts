import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import boardReducer from './board';
import opponentReducer from './opponent';

export const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
  opponent: opponentReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

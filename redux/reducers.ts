import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import boardReducer from './board';
import networkReducer from './network';
import chuessReducer from './chuess';

export const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
  network: networkReducer,
  chuess: chuessReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

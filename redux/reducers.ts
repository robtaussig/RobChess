import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import boardReducer from './board';
import networkReducer from './network';
import chuessReducer from './chuess';
import chaosReducer from './chaos';
import lichessReducer from './lichess';

export const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
  network: networkReducer,
  chuess: chuessReducer,
  chaos: chaosReducer,
  lichess: lichessReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

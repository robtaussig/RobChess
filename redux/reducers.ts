import { combineReducers, createAction } from '@reduxjs/toolkit';
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

export type AppState = {
  user: ReturnType<typeof userReducer>,
  board: ReturnType<typeof boardReducer>,
  network: ReturnType<typeof networkReducer>,
  chuess: ReturnType<typeof chuessReducer>,
  chaos: ReturnType<typeof chaosReducer>,
  lichess: ReturnType<typeof lichessReducer>,
}

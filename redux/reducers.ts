import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';

export const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

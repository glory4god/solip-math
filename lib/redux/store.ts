import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

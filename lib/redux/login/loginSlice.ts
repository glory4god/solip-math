import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserSliceProps {
  login: boolean;
}

const initialState: UserSliceProps = {
  login: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    SET_LOGIN: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
  },
});

export const { SET_LOGIN } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;

export const setLogin = (state: boolean) => {
  return async (dispatch: any) => {
    dispatch(SET_LOGIN(state));
  };
};

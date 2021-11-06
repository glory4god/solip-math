import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from 'lib/apis/user';
import { User } from 'types/user';
import { RootState } from '../store';

interface UserSliceProps {
  selectedUser: string;
  selectedUserId: string;
  selectedGrade: string;
  users: User[];
}

const initialState: UserSliceProps = {
  selectedUser: '',
  selectedUserId: '',
  selectedGrade: '중1',
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_SELECTED_USER: (state, action: PayloadAction<string>) => {
      state.selectedUser = action.payload;
    },
    SET_SELECTED_USER_ID: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
    SET_SELECTED_GRADE: (state, action: PayloadAction<string>) => {
      state.selectedGrade = action.payload;
    },
    SET_USERS: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const {
  SET_SELECTED_USER,
  SET_USERS,
  SET_SELECTED_USER_ID,
  SET_SELECTED_GRADE,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

export const setSelectedUser = (name: string) => {
  return async (dispatch: any) => {
    dispatch(SET_SELECTED_USER(name));
  };
};

export const setSelectedUserId = (id: string) => {
  return async (dispatch: any) => {
    dispatch(SET_SELECTED_USER_ID(id));
    const user: User = (await fetchUser(id)) as User;
    dispatch(SET_SELECTED_USER(user.name));
  };
};
export const setSelectedGrade = (grade: string) => {
  return async (dispatch: any) => {
    dispatch(SET_SELECTED_GRADE(grade));
  };
};

export const setUsers = (userlist: User[]) => {
  return async (dispatch: any) => {
    dispatch(SET_USERS(userlist));
  };
};

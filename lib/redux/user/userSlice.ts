import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from 'lib/apis/user';
import { User } from 'types/user';
import { RootState } from '../store';

interface UserSliceProps {
  selectedUser: User;
  selectedUserId: string;
  selectedGrade: string;
  users: User[];
  grades: string[];
}

const initialState: UserSliceProps = {
  selectedUser: {
    _id: '',
    name: '',
    grade: '',
    auth: undefined,
    gender: '',
    createdDate: new Date(),
  },
  selectedUserId: '',
  selectedGrade: '중1',
  users: [],
  grades: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_SELECTED_USER: (state, action: PayloadAction<User>) => {
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
    SET_GRADES: (state, action: PayloadAction<string[]>) => {
      state.grades = action.payload;
    },
  },
});

export const {
  SET_SELECTED_USER,
  SET_USERS,
  SET_SELECTED_USER_ID,
  SET_SELECTED_GRADE,
  SET_GRADES,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

export const setSelectedUser = (user: User) => {
  return async (dispatch: any) => {
    await dispatch(SET_SELECTED_USER(user));
  };
};

export const setSelectedUserId = (id: string) => {
  return async (dispatch: any) => {
    await dispatch(SET_SELECTED_USER_ID(id));
    const user: User = (await fetchUser(id)) as User;
    await dispatch(SET_SELECTED_USER(user));
  };
};

export const setSelectedGrade = (grade: string) => {
  return async (dispatch: any) => {
    await dispatch(SET_SELECTED_GRADE(grade));
  };
};

export const setUsers = (userlist: User[]) => {
  return async (dispatch: any) => {
    await dispatch(SET_USERS(userlist));
  };
};

export const setGrades = (grades: string[]) => {
  return async (dispatch: any) => {
    await dispatch(SET_GRADES(grades));
  };
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from 'lib/apis/user';
import { Management, User, Wrong } from 'types/user';
import { RootState } from '../store';

interface UserSliceProps {
  selectedUser: string;
  selectedUserId: string;
  selectedGrade: string;
  wrongAnswerList: Wrong[];
  managementList: Management[];
  users: User[];
}

const initialState: UserSliceProps = {
  selectedUser: '',
  selectedUserId: '',
  selectedGrade: '중1',
  wrongAnswerList: [],
  managementList: [],
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
    SET_WRONG_ANSWER_LIST: (state, action: PayloadAction<Wrong[]>) => {
      state.wrongAnswerList = action.payload;
    },
    SET_MANAGEMENT_LIST: (state, action: PayloadAction<Management[]>) => {
      state.managementList = action.payload;
    },
  },
});

export const {
  SET_SELECTED_USER,
  SET_USERS,
  SET_SELECTED_USER_ID,
  SET_SELECTED_GRADE,
  SET_WRONG_ANSWER_LIST,
  SET_MANAGEMENT_LIST,
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

export const setWrongAnswerList = (wrongList: Wrong[]) => {
  return async (dispatch: any) => {
    if (wrongList.length === 0) {
      wrongList.map((book, idx) => {
        book.numbers.sort((a, b) => a.number.length - b.number.length);
      });
    }
    dispatch(SET_WRONG_ANSWER_LIST(wrongList));
  };
};

export const setManagementList = (managementList: Management[]) => {
  return async (dispatch: any) => {
    dispatch(SET_MANAGEMENT_LIST(managementList));
  };
};

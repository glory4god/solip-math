import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ModalSliceProps {
  showScoreWriteModal: boolean;
  showWrongWriteModal: boolean;
  showManagementWriteModal: boolean;
}

const initialState: ModalSliceProps = {
  showScoreWriteModal: false,
  showWrongWriteModal: false,
  showManagementWriteModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    SET_SHOW_SCORE_WRITE_MODAL: (state, action: PayloadAction<boolean>) => {
      state.showScoreWriteModal = action.payload;
    },
    SET_SHOW_WRONG_WRITE_MODAL: (state, action: PayloadAction<boolean>) => {
      state.showWrongWriteModal = action.payload;
    },
    SET_SHOW_MANAGEMENT_WRITE_MODAL: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.showManagementWriteModal = action.payload;
    },
  },
});

export const {
  SET_SHOW_SCORE_WRITE_MODAL,
  SET_SHOW_WRONG_WRITE_MODAL,
  SET_SHOW_MANAGEMENT_WRITE_MODAL,
} = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

export function openWriteModal(modalName: string) {
  return (dispatch: any) => {
    if (modalName === 'score') {
      dispatch(SET_SHOW_SCORE_WRITE_MODAL(true));
    } else if (modalName === 'wrong') {
      dispatch(SET_SHOW_WRONG_WRITE_MODAL(true));
    } else if (modalName === 'management') {
      dispatch(SET_SHOW_MANAGEMENT_WRITE_MODAL(true));
    }
  };
}

export function closeWriteModal(modalName: string) {
  return (dispatch: any) => {
    if (modalName === 'score') {
      dispatch(SET_SHOW_SCORE_WRITE_MODAL(false));
    } else if (modalName === 'wrong') {
      dispatch(SET_SHOW_WRONG_WRITE_MODAL(false));
    } else if (modalName === 'management') {
      dispatch(SET_SHOW_MANAGEMENT_WRITE_MODAL(false));
    }
  };
}

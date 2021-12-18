import React from 'react';
import { useSelector } from 'react-redux';

import { selectModal } from 'lib/redux/modal/modalSlice';

import { ChangeGradeModal } from 'components/ui/Modal';

type PostManagement = {
  author: string;
  studentName: string;
  content: string;
};

interface ModalCtrlProp {}

const ManageModalCtrl: React.FC<ModalCtrlProp> = ({}) => {
  const { showChangeGradeModal } = useSelector(selectModal);

  return <>{showChangeGradeModal && <ChangeGradeModal />}</>;
};

export default ManageModalCtrl;

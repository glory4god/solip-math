import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';

import { closeWriteModal, selectModal } from 'lib/redux/modal/modalSlice';
import { selectUser } from 'lib/redux/user/userSlice';
import { NEXT_SERVER } from 'config';

import WriteModal from 'components/ui/Modal/WriteModal';

import { PostGrade, WrongAnswerType } from 'types/user';

type PostManagement = {
  author: string;
  studentName: string;
  content: string;
};

interface ModalCtrlProp {}

const ModalCtrl: React.FC<ModalCtrlProp> = ({}) => {
  const { showGradeWriteModal, showWrongWriteModal, showManagementWriteModal } =
    useSelector(selectModal);
  const { selectedUser } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const [postGrade, setPostGrade] = React.useState<PostGrade>({
    studentName: selectedUser,
    date: '',
    testName: '',
    score: '',
    comment: '',
  });

  const [postAddBook, setPostAddBook] = React.useState<WrongAnswerType>({
    studentName: selectedUser,
    book: '',
    number: '',
  });

  const [postManagement, setPostManagement] = React.useState<PostManagement>({
    author: '',
    studentName: selectedUser,
    content: '',
  });

  const postAddBookHandler = async () => {
    const res = await fetch(`${NEXT_SERVER}/v1/student/wrong/answers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postAddBook),
    });
    if (!res.ok) {
      alert('저장에 실패했습니다.');
    } else {
      setPostAddBook({
        studentName: selectedUser,
        book: '',
        number: '',
      });
    }
    dispatch(closeWriteModal('wrong'));
    router.replace(router.asPath);
  };

  const postStdManagementHandler = async () => {
    const { studentName, author, content } = postManagement;
    if (studentName === '' || author === '' || content === '') {
      return alert('빈칸없이 입력해주세요.');
    }
    const res = await fetch(`${NEXT_SERVER}/v1/student/management/post`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postManagement),
    });
    if (!res.ok) {
      alert('저장에 실패했습니다.');
    } else {
      setPostManagement({
        author: '',
        studentName: selectedUser,
        content: '',
      });
    }

    dispatch(closeWriteModal('management'));
    router.replace(router.asPath);
  };

  const postGradeManagementHandler = async () => {
    const { studentName, date, testName, score, comment } = postGrade;
    if (
      studentName === '' ||
      date === '' ||
      testName === '' ||
      score === '' ||
      comment === ''
    ) {
      return alert('빈칸없이 입력해주세요.');
    }
    const res = await fetch(`${NEXT_SERVER}/v1/student/score/post`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postGrade),
    });
    if (!res.ok) {
      alert('저장에 실패했습니다.');
    } else {
      setPostGrade({
        studentName: selectedUser,
        testName: '',
        date: '',
        score: '',
        comment: '',
      });
    }

    dispatch(closeWriteModal('grade'));
    router.replace(router.asPath);
  };

  const postOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (Object.keys(postGrade).includes(e.target.name)) {
      setPostGrade(() => ({
        ...postGrade,
        [name]: value,
      }));
    } else if (Object.keys(postAddBook).includes(e.target.name)) {
      setPostAddBook(() => ({
        ...postAddBook,
        [name]: value,
      }));
    } else if (Object.keys(postManagement).includes(e.target.name)) {
      setPostManagement(() => ({
        ...postManagement,
        [name]: value,
      }));
    }
  };

  return (
    <>
      {showWrongWriteModal && (
        <WriteModal
          title={'책추가'}
          modalNm={'wrong'}
          valueData={postAddBook}
          onChange={postOnChange}
          postHandler={postAddBookHandler}
        />
      )}
      {showManagementWriteModal && (
        <WriteModal
          title={'글쓰기'}
          modalNm={'management'}
          valueData={postManagement}
          onChange={postOnChange}
          postHandler={postStdManagementHandler}
        />
      )}
      {showGradeWriteModal && (
        <WriteModal
          title={'성적추가'}
          modalNm={'grade'}
          valueData={postGrade}
          onChange={postOnChange}
          postHandler={postGradeManagementHandler}
        />
      )}
    </>
  );
};

export default ModalCtrl;

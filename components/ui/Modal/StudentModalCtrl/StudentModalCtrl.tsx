import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';

import { closeWriteModal, selectModal } from 'lib/redux/modal/modalSlice';
import { selectUser } from 'lib/redux/user/userSlice';
import { NEXT_SERVER } from 'config';

import WriteModal from 'components/ui/Modal/WriteModal';

import { PostScore, WrongAnswerType } from 'types/user';

type PostManagement = {
  author: string;
  studentName: string;
  content: string;
};

interface ModalCtrlProp {}

const StudentModalCtrl: React.FC<ModalCtrlProp> = ({}) => {
  const { showScoreWriteModal, showWrongWriteModal, showManagementWriteModal } =
    useSelector(selectModal);
  const { selectedUser } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const [postScore, setPostScore] = React.useState<PostScore>({
    studentName: selectedUser.name,
    date: '',
    testName: '',
    score: '',
    comment: '',
  });

  const [postAddBook, setPostAddBook] = React.useState<WrongAnswerType>({
    studentName: selectedUser.name,
    book: '',
    number: '',
  });

  const [postManagement, setPostManagement] = React.useState<PostManagement>({
    author: '',
    studentName: selectedUser.name,
    content: '',
  });

  const postAddBookHandler = async () => {
    const res = await fetch(`${NEXT_SERVER}/v1/management/wrong/answers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postAddBook),
    });
    if (!res.ok) {
      return alert('저장에 실패했습니다.');
    } else {
      setPostAddBook({
        studentName: selectedUser.name,
        book: '',
        number: '',
      });
      alert('책을 추가했습니다');
    }
    dispatch(closeWriteModal('wrong'));
    router.replace(router.asPath);
  };

  const postStdManagementHandler = async () => {
    const { studentName, author, content } = postManagement;
    if (studentName === '' || author === '' || content === '') {
      return alert('빈칸없이 입력해주세요.');
    }
    const res = await fetch(`${NEXT_SERVER}/v1/management/student/post`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postManagement),
    });
    if (!res.ok) {
      return alert('저장에 실패했습니다.');
    } else {
      setPostManagement({
        author: '',
        studentName: selectedUser.name,
        content: '',
      });
      alert('글이 작성됐습니다.');
    }

    dispatch(closeWriteModal('management'));
    router.replace(router.asPath);
  };

  const postScoreManagementHandler = async () => {
    const { studentName, date, testName, score, comment } = postScore;
    if (
      studentName === '' ||
      date === '' ||
      testName === '' ||
      score === '' ||
      comment === ''
    ) {
      return alert('빈칸없이 입력해주세요.');
    }
    const res = await fetch(`${NEXT_SERVER}/v1/management/score/post`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postScore),
    });
    if (!res.ok) {
      return alert('저장에 실패했습니다.');
    } else {
      setPostScore({
        studentName: selectedUser.name,
        testName: '',
        date: '',
        score: '',
        comment: '',
      });
      alert('성적이 입력됐습니다');
    }

    dispatch(closeWriteModal('score'));
    router.replace(router.asPath);
  };

  const postOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (Object.keys(postScore).includes(e.target.name)) {
      setPostScore(() => ({
        ...postScore,
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
      {showScoreWriteModal && (
        <WriteModal
          title={'성적추가'}
          modalNm={'score'}
          valueData={postScore}
          onChange={postOnChange}
          postHandler={postScoreManagementHandler}
        />
      )}
    </>
  );
};

export default StudentModalCtrl;

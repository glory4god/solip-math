import React from 'react';
import s from '../Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import { closeChangeGradeModal } from 'lib/redux/modal/modalSlice';
import { selectUser, setSelectedUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import { NEXT_SERVER } from 'config';
import { User } from 'types/user';

interface ModalProps {
  className?: string;
}

const ChangeGradeModal: React.FC<ModalProps> = ({ className }) => {
  const { grades, selectedUser } = useSelector(selectUser);

  const [postUser, setPostUser] = React.useState<User>(selectedUser);

  const dispatch = useDispatch();
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostUser(() => ({
      ...postUser,
      grade: e.target.value,
    }));
  };

  const postUserHandler = async (postUser: User) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/post`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postUser),
    });
    if (!res.ok) {
      return alert('저장에 실패했습니다.');
    }
    alert('반을 변경했습니다');
    dispatch(closeChangeGradeModal());
    dispatch(
      setSelectedUser({
        _id: '',
        name: '',
        gender: '',
        auth: undefined,
        grade: '',
        createdDate: new Date(),
      }),
    );
    router.replace(router.asPath);
  };
  return (
    <>
      <div
        className={s.outerContainer_2}
        onClick={() => dispatch(closeChangeGradeModal())}
      />
      {console.log(selectedUser, postUser)}
      <div className={s.innerContainer_2}>
        <div className="text-lg">반변경</div>
        <div className={s.inputWrapper}></div>
        <div className="py-4">
          <select value={postUser.grade} onChange={onChangeHandler}>
            <option value="null">선택</option>
            {grades.map((g, idx) => {
              return (
                <option key={idx} value={g}>
                  {g}
                </option>
              );
            })}
          </select>
        </div>
        <Button onClick={() => postUserHandler(postUser)}>변경</Button>
        <Button onClick={() => dispatch(closeChangeGradeModal())}>취소</Button>
      </div>
    </>
  );
};

export default ChangeGradeModal;

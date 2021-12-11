import React from 'react';
import s from '../Modal.module.css';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ObjType } from 'types/common';
import { PostGrade, WrongAnswerType } from 'types/user';

import { closeWriteModal } from 'lib/redux/modal/modalSlice';

const TagModalNm: ObjType = {
  studentName: '학생이름',
  date: '시험일시',
  testName: '시험이름',
  score: '점 수',
  comment: '내 용',
  book: '책이름',
  number: '오답번호',
  content: '내 용',
  author: '작성자',
};

interface ModalProps {
  className?: string;
  title: string;
  valueData: ObjType;
  modalNm: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  postHandler: () => void;
}

const WriteModal: React.FC<ModalProps> = ({
  className,
  title,
  onChange,
  valueData,
  modalNm,
  postHandler,
}) => {
  const dispatch = useDispatch();

  const tagKeys = Object.keys(valueData);

  return (
    <>
      <div
        className={s.outerContainer_2}
        onClick={() => dispatch(closeWriteModal(modalNm))}
      />
      <div className={s.innerContainer_2}>
        <div className="text-lg">{title}</div>
        <div className={s.inputWrapper}>
          {tagKeys.map((t) => {
            return (
              <div key={t}>
                <span>{TagModalNm[t]}</span>
                {TagModalNm[t] !== '내 용' ? (
                  <TextField
                    className="w-64"
                    name={t}
                    disabled={TagModalNm[t] === '학생이름'}
                    value={valueData[t]}
                    onChange={onChange}
                    size="small"
                  />
                ) : (
                  <textarea
                    className="w-64 h-48"
                    name={t}
                    value={valueData[t]}
                    onChange={onChange}
                  />
                )}
              </div>
            );
          })}
        </div>
        <Button onClick={postHandler}>입력</Button>
        <Button onClick={() => dispatch(closeWriteModal(modalNm))}>취소</Button>
      </div>
    </>
  );
};

export default WriteModal;

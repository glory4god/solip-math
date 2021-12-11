import Button from '@material-ui/core/Button';
import { openWriteModal } from 'lib/redux/modal/modalSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface Props {}

const GradeContainer: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="my-2">성적관리</div>
      <div className="flex justify-end">
        <Button onClick={() => dispatch(openWriteModal('grade'))}>
          성적추가
        </Button>
      </div>
      <table className="w-full">
        <colgroup>
          <col className="w-2/12" />
          <col className="w-3/12" />
          <col className="w-1/12" />
          <col className="w-6/12" />
        </colgroup>
        <thead className="h-12">
          <tr>
            <th>시험일시</th>
            <th>시험이름</th>
            <th>점수</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>2021/12/10</th>
            <td>2019년 고1 3월 모의고사</td>
            <td>123</td>
            <td>대충봄</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GradeContainer;

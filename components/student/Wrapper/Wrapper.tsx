import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  WrongAnswerContainer,
  ManagementContainer,
  DataInfoBox,
  GradeContainer,
} from '..';

interface Props {}

const Wrapper: React.FC<Props> = () => {
  const { selectedGrade, selectedUser, selectedUserId } =
    useSelector(selectUser);
  const route = useRouter();

  const { pages } = route.query;
  return (
    <div>
      {
        pages === '1' && <WrongAnswerContainer />

        /* <div className="grid sm:grid-cols-2 sm:gap-8 sm:p-4 mt-8">
            <DataInfoBox title={`${selectedUser} 오답 TOP 5`} />
            <DataInfoBox title={`${selectedGrade} 오답 TOP 5`} />
          </div> */
      }
      {pages === '2' && <ManagementContainer />}
      {pages === '3' && <GradeContainer />}
    </div>
  );
};

export default Wrapper;

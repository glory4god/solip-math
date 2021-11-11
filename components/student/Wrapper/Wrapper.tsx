import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { WrongAnswerBox, ManagementBox, DataInfoBox } from '..';

interface Props {}

const Wrapper: React.FC<Props> = () => {
  const { selectedGrade, selectedUser } = useSelector(selectUser);
  const route = useRouter();

  const { pages } = route.query;

  var pageId: string = route.asPath.split('student/')[1];
  pageId = pageId.split('?')[0];

  return (
    <div>
      {pages === '1' && (
        <>
          <div className="sm:mb-6 my-2">오답관리</div>
          <WrongAnswerBox pageId={pageId} />
          <div className="grid sm:grid-cols-2 sm:gap-8 sm:p-4 mt-8">
            <DataInfoBox title={`${selectedUser} 오답 TOP 5`} />
            <DataInfoBox title={`${selectedGrade} 오답 TOP 5`} />
          </div>
        </>
      )}
      {pages === '2' && (
        <>
          <div className="sm:mb-6 my-2">학생관리</div>
          <ManagementBox pageId={pageId} />
        </>
      )}
      {pages === '3' && <div className="sm:mb-6 my-2">???</div>}
    </div>
  );
};

export default Wrapper;

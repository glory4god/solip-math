import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { WrongAnswerBox, ManagementBox } from '..';

interface Props {}

const Wrapper: React.FC<Props> = () => {
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
        </>
      )}
      {pages === '2' && (
        <>
          <div className="sm:mb-6 my-2">학생관리</div>
          <ManagementBox pageId={pageId} />
        </>
      )}
      {pages === '3' && <div className="sm:mb-6 my-2">???</div>}
      <div></div>
    </div>
  );
};

export default Wrapper;

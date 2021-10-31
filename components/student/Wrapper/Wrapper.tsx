import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { BoardBox } from '..';
interface Props {}

const Wrapper: React.FC<Props> = () => {
  const route = useRouter();

  const { pages } = route.query;

  var pageId: string = route.asPath.split('student/')[1];
  pageId = pageId.split('?')[0];

  React.useEffect(() => {}, []);

  return (
    <div>
      {pages === '1' && (
        <>
          <BoardBox pageId={pageId} />
        </>
      )}
      {pages === '2' && <>2번 </>}
      {pages === '3' && <>3번</>}
      <div></div>
    </div>
  );
};

export default Wrapper;

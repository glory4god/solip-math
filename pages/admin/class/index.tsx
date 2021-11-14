import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { User } from 'types/user';
import { grades } from 'public/data';
import { Container } from 'components/ui/Container';
import Button from '@material-ui/core/Button';
import { ClassContainer } from 'components/class';
import { selectLogin } from 'lib/redux/login/loginSlice';

interface Props {
  userList: User[];
}

const Main: NextPage<Props> = ({}: {}) => {
  const { login } = useSelector(selectLogin);
  const [grade, setGrade] = React.useState<number>(1);
  const route = useRouter();

  React.useEffect(() => {
    if (!login) {
      route.push('/login');
    }
  });

  return (
    <>
      <Head>
        <title>학년별 관리</title>
        <meta name="description" content="학년별 관리" />
      </Head>

      <Container>
        <h2 className="pt-20 pb-4 text-2xl">학년별 관리</h2>
        <div>
          {grades.map((grade: string, idx: number) => {
            return (
              <Button key={'grade' + grade} onClick={() => setGrade(idx + 1)}>
                {grade}
              </Button>
            );
          })}
        </div>

        <ClassContainer grade={grades[grade - 1]} />
      </Container>
    </>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

import Button from '@material-ui/core/Button';
import { Container } from 'components/ui/Container';
import { ClassContainer } from 'components/class';

import { fetchGradeList } from 'lib/apis/user';

interface Props {
  grades: string[];
}

const Main: NextPage<Props> = ({ grades }) => {
  const [grade, setGrade] = React.useState<number>(1);
  const route = useRouter();

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
  const grades = await fetchGradeList();
  return {
    props: {
      grades: grades.map((g) => {
        return g.grade;
      }),
    },
  };
};

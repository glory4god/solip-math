import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';

import { Container } from 'components/ui/Container';

interface Props {}

const Main: NextPage<Props> = ({}: {}) => {
  return (
    <>
      <Head>
        <title>솔잎샘 학생관리 시스템</title>
        <meta name="description" content="학생관리" />
      </Head>

      <Container>
        <h2 className="pt-20 pb-4 text-2xl">솔잎샘 학생관리 시스템</h2>
        <div className="pt-4"></div>
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

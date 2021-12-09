import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import {
  selectUser,
  setSelectedGrade,
  setSelectedUser,
  setSelectedUserId,
  setUsers,
} from 'lib/redux/user/userSlice';

import { Container } from 'components/ui/Container';

import { User } from 'types/user';
import { fetchUserList } from 'lib/apis/user';
import { grades } from 'public/data';

interface Props {
  userList: User[];
}

const Main: NextPage<Props> = ({ userList }: { userList: User[] }) => {
  const { selectedGrade, selectedUserId, users } = useSelector(selectUser);
  const dispatch = useDispatch();
  const route = useRouter();

  React.useEffect(() => {
    dispatch(setUsers(userList));
    dispatch(setSelectedUser(''));
    dispatch(setSelectedUserId(''));
    dispatch(setSelectedGrade('중1'));
  }, []);

  return (
    <>
      <Head>
        <title>솔잎샘 학생관리 시스템</title>
        <meta name="description" content="학생관리" />
      </Head>

      <Container>
        <h2 className="pt-20 pb-4 text-2xl">솔잎샘 학생관리 시스템</h2>
        <div className="pt-4 ">
          <span className="text-xl">학생선택</span>
          <select
            className="w-16"
            value={selectedGrade}
            onChange={(e) => {
              dispatch(setSelectedGrade(e.target.value));
            }}>
            {grades?.map((user, idx) => {
              return (
                <option key={idx} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
          <select
            className="w-32"
            value={selectedUserId}
            onChange={(e) => {
              dispatch(setSelectedUserId(e.target.value));
              route.push(`/admin/student/${e.target.value}?pages=1`);
            }}>
            <option value="null">선택</option>
            {users?.map((user, idx) => {
              if (user.grade === selectedGrade) {
                return (
                  <option key={idx} value={user._id}>
                    {user.name}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </Container>
    </>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      userList: (await fetchUserList()) as User[],
    },
  };
};

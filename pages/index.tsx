import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import {
  selectUser,
  setSelectedUser,
  setSelectedUserId,
  setUsers,
} from 'lib/redux/user/userSlice';

import { Container } from '../components/ui/Container';

import { User } from 'types/user';
import { BASE_URL } from 'config';
import { fetchUserList } from 'lib/apis/user';

interface Props {
  userList: User[];
}

const Main: NextPage<Props> = ({ userList }: { userList: User[] }) => {
  const { selectedUserId, users } = useSelector(selectUser);
  const dispatch = useDispatch();
  const route = useRouter();

  React.useEffect(() => {
    dispatch(setUsers(userList));
    dispatch(setSelectedUser(''));
  }, []);

  return (
    <>
      <Head>
        <title>솔잎샘 학원</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h2 className="pt-16">솔잎샘 학생관리 시스템</h2>
        <div className="pt-4">
          <span>학생선택</span>
          <select
            className="w-32"
            value={selectedUserId}
            onChange={(e) => {
              dispatch(setSelectedUserId(e.target.value));
              route.push(`/student/${e.target.value}?pages=1`);
            }}>
            {users?.map((user, idx) => {
              return (
                <option key={idx} value={user._id}>
                  {user.name}
                </option>
              );
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

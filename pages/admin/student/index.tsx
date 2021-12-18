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
import { fetchGradeList, fetchUserList } from 'lib/apis/user';

interface Props {
  userList: User[];
  grades: string[];
}

const Main: NextPage<Props> = ({ userList, grades }) => {
  const { selectedGrade, selectedUserId, users } = useSelector(selectUser);
  const dispatch = useDispatch();
  const route = useRouter();

  React.useEffect(() => {
    dispatch(setUsers(userList));
    dispatch(
      setSelectedUser({
        _id: '',
        name: '',
        grade: '',
        auth: undefined,
        gender: '',
        createdDate: new Date(),
      }),
    );
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
  const grades = await fetchGradeList();
  return {
    props: {
      grades: grades.map((g) => {
        return g.grade;
      }),
      userList: (await fetchUserList()) as User[],
    },
  };
};

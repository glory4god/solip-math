import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
  selectUser,
  setSelectedGrade,
  setSelectedUser,
  setSelectedUserId,
} from 'lib/redux/user/userSlice';
import { selectLogin } from 'lib/redux/login/loginSlice';

import { BASE_URL } from 'config';

import Button from '@material-ui/core/Button';
import { studentMenu } from 'public/data';

import { fetchGradeList, fetchUserIds } from 'lib/apis/user';
import { ParsedUrlQuery } from 'querystring';
import { ModalCtrl, Wrapper } from 'components/student';
import { Container } from 'components/ui/Container';
import { Grade } from 'types/user';

interface Props {}

const Student: NextPage<Props> = ({}) => {
  const { selectedGrade, selectedUserId, selectedUser, users } =
    useSelector(selectUser);
  const { login } = useSelector(selectLogin);

  const [grades, setGrades] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const route = useRouter();

  const { pages } = route.query;

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedUserId(e.target.value));
    route.push(`/admin/student/${e.target.value}?pages=${route.query.pages}`);
  };
  React.useEffect(() => {
    if (selectedUserId !== '') {
      route.push(`${BASE_URL}/admin/student/${selectedUserId}?pages=1`);
    }
    if (!login) {
      route.push(`${BASE_URL}/login`);
    }
  }, [login, selectedUserId]);

  const getGrades = React.useCallback(async () => {
    const res = (await fetchGradeList()) as Grade[];
    const grades = res.map((g) => {
      return g.grade;
    });
    setGrades(grades);
  }, []);

  React.useEffect(() => {
    getGrades();
  }, []);

  return (
    <>
      <Head>
        <title>
          {selectedGrade} {selectedUser} 학생관리 / 수학
        </title>
        <meta name="description" content="학생관리" />
      </Head>
      <Container>
        <div className="flex justify-between sm:pt-20 sm:flex-row sm:pb-4 flex-col pt-20 pb-4 ">
          <div className="sm:block">
            <select
              className="w-16"
              value={selectedGrade}
              onChange={(e) => {
                dispatch(setSelectedGrade(e.target.value));

                const filterUser = users.find(
                  (user) => user.grade === e.target.value,
                );

                if (filterUser !== undefined) {
                  dispatch(setSelectedUserId(filterUser._id));
                  dispatch(setSelectedUser(filterUser.name));
                  route.push(
                    `/admin/student/${filterUser._id}?pages=${route.query.pages}`,
                  );
                }
              }}>
              {grades?.map((user, idx) => {
                return (
                  <option key={idx} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
            <select className="w-32" value={selectedUserId} onChange={onChange}>
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
          <div>
            {studentMenu.map((menu, idx) => {
              return (
                <Link
                  key={idx}
                  href={`${BASE_URL}/admin/student/${
                    selectedUserId !== '' ? selectedUserId : users[0]._id
                  }?pages=${menu.code}`}>
                  <a>
                    <Button
                      style={{
                        color: `${pages === menu.code ? 'blue' : 'black'}`,
                      }}>
                      <b>{menu.name}</b>
                    </Button>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <Wrapper></Wrapper>
      </Container>
      <ModalCtrl />
    </>
  );
};

export default Student;

interface IParams extends ParsedUrlQuery {
  name: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const arr = (await fetchUserIds()) as string[];
  const paths = arr.map((name) => {
    return {
      params: { name },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params as IParams;

  return {
    props: {},
  };
};

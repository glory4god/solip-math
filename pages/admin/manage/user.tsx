import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Container } from 'components/ui/Container';
import { grades, profileEditMap } from 'public/data';
import Button from '@material-ui/core/Button';
import { NEXT_SERVER } from 'config';
import { User, UserEdit } from 'types/user';
import { useSelector } from 'react-redux';
import { selectLogin } from 'lib/redux/login/loginSlice';
import { useRouter } from 'next/dist/client/router';
import { fetchExceptUserList, fetchUserList } from 'lib/apis/user';
import { UserContent } from 'components/manage';

interface Props {
  userList: User[];
  exceptUserList: User[];
}

const User: NextPage<Props> = ({
  userList,
  exceptUserList,
}: {
  userList: User[];
  exceptUserList: User[];
}) => {
  const { login } = useSelector(selectLogin);
  const [userProfile, setUserProfile] = React.useState<UserEdit>({
    name: '',
    grade: '',
    gender: '',
  });
  const [currIdx, setCurrIdx] = React.useState<number>(0);

  const [exceptCurrIdx, setExceptCurrIdx] = React.useState<number>(0);
  const route = useRouter();

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const postUser = async (userProfile: UserEdit) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/post`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userProfile),
    });
    if (!res.ok) {
      return alert('학생 추가 실패');
    }

    setUserProfile({
      name: '',
      grade: '',
      gender: '',
    });
    route.replace(route.asPath);
    return alert('학생 추가 성공');
  };

  const handleUserDelete = async (userId: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/post?id=${userId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    if (!res.ok) {
      return alert('학생 삭제하지 못했습니다.');
    }
    route.replace(route.asPath);
    return alert('학생을 삭제했습니다.');
  };

  const handleUserInsert = async (userId: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/post?id=${userId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
    });
    if (!res.ok) {
      return alert('학생 제외하지 못했습니다.');
    }
    route.replace(route.asPath);
    return alert('학생을 제외했습니다.');
  };

  React.useEffect(() => {
    if (!login) {
      route.replace('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>솔잎샘 학생 정보 관리</title>
        <meta name="description" content="학생관리" />
      </Head>

      <Container>
        <div className="grid sm:grid-cols-2 grid-cols-1 pt-8 px-6 text-left">
          <div>
            <h2 className="pt-24 pb-8">학생 정보 추가</h2>
            {profileEditMap.map((edit, idx) => {
              return (
                <div className="pb-4" key={idx}>
                  <div className="pb-4">{edit.tit}</div>
                  {!edit.data ? (
                    <input
                      name={edit.name}
                      value={userProfile[edit.name]}
                      type={edit.type}
                      onChange={onChange}
                    />
                  ) : (
                    edit.data.map((e, idx) => {
                      return (
                        <span className="pr-4" key={idx}>
                          <span>{e.value}</span>
                          <input
                            type={edit.type}
                            name={edit.name}
                            value={e.value}
                            onChange={onChange}
                          />
                        </span>
                      );
                    })
                  )}
                </div>
              );
            })}
            <Button
              onClick={() => {
                if (userProfile.name !== '') {
                  postUser(userProfile);
                }
              }}>
              추가
            </Button>
          </div>
          <div>
            <h2 className="pt-16 pb-8">전체 학생 정보 [{userList.length}]</h2>
            <div>
              {grades.map((grade, idx) => {
                var count = 0;
                userList.forEach((user) => {
                  if (user.grade === grade) {
                    count += 1;
                  }
                });
                return (
                  <UserContent
                    key={grade}
                    condition="제외"
                    handleCurrIdx={() => {
                      setCurrIdx(idx);
                    }}
                    grade={grade}
                    count={count}
                    isShow={currIdx === idx}
                    userList={userList}
                    handleUser={(_id: string) => handleUserInsert(_id)}
                  />
                );
              })}
            </div>
            <h2 className="pt-16 pb-8">
              제외 학생 정보 [{exceptUserList.length}]
            </h2>
            <div>
              {grades.map((grade, idx) => {
                var count = 0;
                exceptUserList.forEach((user) => {
                  if (user.grade === grade) {
                    count += 1;
                  }
                });
                return (
                  <UserContent
                    key={grade}
                    condition="삭제"
                    handleCurrIdx={() => setExceptCurrIdx(idx)}
                    grade={grade}
                    count={count}
                    isShow={exceptCurrIdx === idx}
                    userList={exceptUserList}
                    handleUser={(_id: string) => handleUserDelete(_id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      userList: (await fetchUserList()) as User[],
      exceptUserList: (await fetchExceptUserList()) as User[],
    },
  };
};

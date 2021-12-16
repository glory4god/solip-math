import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Container } from 'components/ui/Container';
import { EditMap, gradeEditMap, profileEditMap } from 'public/data';
import Button from '@material-ui/core/Button';
import { NEXT_SERVER } from 'config';
import { Grade, User, UserEdit } from 'types/user';
import { useRouter } from 'next/dist/client/router';
import {
  fetchExceptUserList,
  fetchGradeList,
  fetchUserList,
} from 'lib/apis/user';
import { UserContent } from 'components/manage';

interface Props {
  userList: User[];
  exceptUserList: User[];
  profileEdits: EditMap[];
  grades: string[];
}

const User: NextPage<Props> = ({
  userList,
  exceptUserList,
  profileEdits,
  grades,
}) => {
  const [userProfile, setUserProfile] = React.useState<UserEdit>({
    name: '',
    grade: '',
    gender: '',
  });
  const [postGrade, setPostGrade] = React.useState<string>('');
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

    setUserProfile(() => ({
      ...userProfile,
      name: '',
    }));
    route.replace(route.asPath);
    return alert('학생 추가 성공');
  };

  const postGradeHandler = async (grade: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/grade/post?id=${grade}`, {
      method: 'POST',
    });
    if (!res.ok) {
      return alert(`${grade}반 추가를 실패했습니다.`);
    }
    setPostGrade('');
    route.replace(route.asPath);
    return alert(`${grade}반을 추가했습니다.`);
  };

  const userDeleteHandler = async (userId: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/post?userId=${userId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    if (!res.ok) {
      return alert('학생 삭제하지 못했습니다.');
    }
    route.replace(route.asPath);
    return alert('학생을 삭제했습니다.');
  };

  const userUpdateHandler = async (userId: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/post?userId=${userId}`, {
      method: 'PATCH',
    });
    if (!res.ok) {
      return alert('학생정보를 변경하지 못했습니다.');
    }
    route.replace(route.asPath);
    return alert('학생정보를 변경했습니다.');
  };

  const userGradeUpdateHandler = async (userId: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/post?userId=${userId}`, {
      method: 'PATCH',
    });
    if (!res.ok) {
      return alert('학생정보를 변경하지 못했습니다.');
    }
    route.replace(route.asPath);
    return alert('학생정보를 변경했습니다.');
  };

  return (
    <>
      <Head>
        <title>솔잎샘 학생 정보 관리</title>
        <meta name="description" content="학생관리" />
      </Head>

      <Container>
        <div className="grid sm:grid-cols-2 grid-cols-1 pt-8 px-6 text-left">
          <div>
            <h2 className="pt-16 pb-8">학생 정보 추가</h2>
            {profileEdits.map((edit, idx) => {
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

            <h2 className="pt-16 pb-8">반 정보 추가</h2>
            {gradeEditMap.map((edit, idx) => {
              return (
                <div className="pb-4" key={idx}>
                  <div className="pb-4">{edit.tit}</div>
                  {!edit.data ? (
                    <input
                      name={edit.name}
                      value={postGrade}
                      type={edit.type}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPostGrade(e.target.value);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          if (postGrade !== '') {
                            postGradeHandler(postGrade);
                          }
                        }
                      }}
                    />
                  ) : (
                    edit.data.map((e, idx) => {
                      return (
                        <span className="pr-4" key={idx}>
                          <span>{e.value}</span>
                          <input
                            type={edit.type}
                            name={edit.name}
                            value={postGrade}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              setPostGrade(e.target.value);
                            }}
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
                if (postGrade !== '') {
                  postGradeHandler(postGrade);
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
                    handleCurrIdx={() => {
                      setCurrIdx(idx);
                    }}
                    grade={grade}
                    count={count}
                    isShow={currIdx === idx}
                    userList={userList}
                    buttonProps={[
                      {
                        condition: '반변경',
                        buttonHandler: (_id: string) => {},
                      },
                      {
                        condition: '제외',
                        buttonHandler: (_id: string) => userUpdateHandler(_id),
                      },
                    ]}
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
                    handleCurrIdx={() => setExceptCurrIdx(idx)}
                    grade={grade}
                    count={count}
                    isShow={exceptCurrIdx === idx}
                    userList={exceptUserList}
                    buttonProps={[
                      {
                        condition: '추가',
                        buttonHandler: (_id: string) => userUpdateHandler(_id),
                      },
                      {
                        condition: '삭제',
                        buttonHandler: (_id: string) => userDeleteHandler(_id),
                      },
                    ]}
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
  const grades = (await fetchGradeList()) as Grade[];
  profileEditMap.map((profile) => {
    if (profile.name === 'grade') {
      profile.data = [];
      grades.forEach((g) => {
        profile.data?.push({ value: g.grade });
      });
    }
  });
  return {
    props: {
      grades: grades.map((g) => {
        return g.grade;
      }),
      profileEdits: profileEditMap,
      userList: (await fetchUserList()) as User[],
      exceptUserList: (await fetchExceptUserList()) as User[],
    },
  };
};

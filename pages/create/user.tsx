import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Container } from 'components/ui/Container';
import { profileEditMap } from 'public/data';
import Button from '@material-ui/core/Button';
import { NEXT_SERVER } from 'config';
import { UserEdit } from 'types/user';

const User: NextPage = () => {
  const [userProfile, setUserProfile] = React.useState<UserEdit>({
    name: '',
    grade: '',
    gender: '',
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
    console.log(userProfile);
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
    return alert('학생 추가 성공');
  };

  return (
    <>
      <Head>
        <title>학생 추가</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h2 className="pt-16 pb-8">학생 정보 추가</h2>
        <div className="text-left">
          {profileEditMap.map((edit, idx) => {
            return (
              <div className="pb-4 pl-4" key={idx}>
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
      </Container>
    </>
  );
};

export default User;

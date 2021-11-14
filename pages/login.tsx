import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

import { Container } from '../components/ui/Container';
import { Login } from 'types/login';
import { useDispatch } from 'react-redux';
import { setLogin, SET_LOGIN } from 'lib/redux/login/loginSlice';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/dist/client/router';

const Login: NextPage = () => {
  const [loginForm, setLoginForm] = React.useState<Login>({
    id: '',
    password: '',
  });
  const dispatch = useDispatch();
  const route = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(() => ({
      ...loginForm,
      [name]: value,
    }));
  };
  return (
    <>
      <Head>
        <title>솔잎샘 로그인</title>
        <meta name="description" content="학생관리 로그인 페이지" />
      </Head>
      <Container>
        <h2 className="pt-16">Login</h2>
        <div className="pt-4 text-left space-y-1">
          <div>
            <input
              name="id"
              type="text"
              value={loginForm.id}
              onChange={onChange}
            />
          </div>
          <div>
            <input
              name="password"
              type="text"
              value={loginForm.password}
              onChange={onChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (
                    loginForm.id === 'thfdlvtoa' &&
                    loginForm.password === 'thfdlvtoa'
                  ) {
                    alert('로그인에 성공했습니다.');
                    dispatch(setLogin(true));
                    setLoginForm({ id: '', password: '' });
                    route.replace('/');
                  } else if (loginForm.id !== 'thfdlvtoa') {
                    alert('아이디가 틀렸습니다.');
                  } else if (loginForm.password !== 'thfdlvtoa') {
                    alert('패스워드가 틀렸습니다.');
                  }
                }
              }}
            />
          </div>
          <button
            onClick={() => {
              if (
                loginForm.id === 'thfdlvtoa' &&
                loginForm.password === 'thfdlvtoa'
              ) {
                alert('로그인에 성공했습니다.');
                dispatch(setLogin(true));
                setLoginForm({ id: '', password: '' });
                route.replace('/');
              } else if (loginForm.id !== 'thfdlvtoa') {
                alert('아이디가 틀렸습니다.');
              } else if (loginForm.password !== 'thfdlvtoa') {
                alert('패스워드가 틀렸습니다.');
              }
            }}>
            로그인
          </button>
        </div>
      </Container>
    </>
  );
};

export default Login;

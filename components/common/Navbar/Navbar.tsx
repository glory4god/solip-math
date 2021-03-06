import React from 'react';
import Link from 'next/link';
import s from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin, setLogin } from 'lib/redux/login/loginSlice';
import { useRouter } from 'next/dist/client/router';

const Navbar = () => {
  const { login } = useSelector(selectLogin);
  const route = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!login) {
      route.replace('/login');
    }
  }, [login]);

  return (
    <>
      <div className={s.paper}>
        <div className={s.navigator}>
          <Link href="/">
            <a className={s.mainlogo}>
              <b>솔잎샘 학생관리</b>
            </a>
          </Link>
          <div className="space-x-4 flex">
            <Link href="/admin/student">
              <a>
                <b>학생별</b>
              </a>
            </Link>
            <Link href="/admin/class">
              <a>
                <b>학년별</b>
              </a>
            </Link>
            <Link href="/admin/manage/user">
              <a>
                <b>페이지관리</b>
              </a>
            </Link>
            <a
              onClick={() => {
                if (login) {
                  const result = confirm('로그아웃을 하시겠습니까?');
                  if (result) {
                    alert('로그아웃 되었습니다.');
                    dispatch(setLogin(false));
                  }
                } else {
                  route.replace('/login');
                }
              }}>
              <b>{login ? '로그아웃' : '로그인'}</b>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

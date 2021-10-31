import React from 'react';
import Link from 'next/link';
import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <>
      <div className={s.paper}>
        <div className={s.navigator}>
          <Link href="/">
            <a className={s.mainlogo}>
              <b>솔잎샘 학생관리</b>
            </a>
          </Link>

          <Link href="/create/user">
            <a>
              <b>학생추가</b>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

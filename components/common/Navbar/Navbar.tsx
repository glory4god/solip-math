import React from 'react';
import Link from 'next/link';
import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <>
      <div className={s.paper}>
        <div className={s.navigator}>
          <Link href="/">
            <a className={s.mainlogo}>SOLIP</a>
          </Link>

          <Link href="/create/user">
            <a>학생추가</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

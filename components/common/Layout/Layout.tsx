import React from 'react';
import s from './Layout.module.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useRouter } from 'next/dist/client/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className={s.layout}>{children}</div>
      <Footer />
    </>
  );
}

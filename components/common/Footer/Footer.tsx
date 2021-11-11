import React from 'react';
import s from './Footer.module.css';

import cn from 'classnames';

const Footer = () => {
  return (
    <div className={cn(s.container)}>
      <div className={s.footer}>
        <span>Management System 2021.11~</span>
        <span>designed by H.Y.</span>
      </div>
    </div>
  );
};

export default Footer;

import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import cl from './header.module.scss';

const Header: React.FC = () => {
  return <header className={cl.header}>header</header>;
};

export default Header;

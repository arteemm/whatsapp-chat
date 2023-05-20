import React from 'react';
import cl from './spinner.module.scss';
import loader from '../../assets/images/loader.gif';
import { useAppSelector } from '../../hooks/redux';

type ChildrenProps = {
  children: React.ReactNode;
};

const Spinner = (props: ChildrenProps) => {
  const { loading: loadingUser } = useAppSelector((state) => state.user);
  return loadingUser ? (
    <div className={cl.spinner}>
      <img className={cl.spinner__loader} src={loader} alt="Load results" />
    </div>
  ) : (
    <>{props.children}</>
  );
};

export default Spinner;

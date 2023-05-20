import { useNavigate } from 'react-router-dom';
import React from 'react';
import cl from './header.module.scss';
import { userSlice } from '../../store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const Header: React.FC = () => {
  const { setStateInstance, setIdInstance, setTokenInstance } = userSlice.actions;
  const { currentNumber } = useAppSelector((store) => store.chat);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeInstance = () => {
    dispatch(setStateInstance('notAuthorized'));
    dispatch(setIdInstance(''));
    dispatch(setTokenInstance(''));
    localStorage.removeItem('idInstance');
    localStorage.removeItem('apiTokenInstance');
    navigate('/');
  };

  return (
    <header className={cl.header}>
      <div>
        <button className={cl.header__button} onClick={changeInstance}>
          Сменить инстанс
        </button>
      </div>
      <div className={cl[`header__current-chat`]}>
        <p>{currentNumber}</p>
      </div>
    </header>
  );
};

export default Header;

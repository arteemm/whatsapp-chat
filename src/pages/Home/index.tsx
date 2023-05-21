import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './home.module.scss';
import Login from '../../components/LogInForm';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchUser } from '../../store/reducers/actionCreators';
import Spinner from '../../components/Spinner';
import { StatusCodes } from 'http-status-codes';
import { userSlice } from '../../store/reducers/userSlice';

const HomePage: React.FC = () => {
  const { stateInstance, user, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resetError } = userSlice.actions;

  const setLocalStorage = () => {
    localStorage.setItem('idInstance', user.idInstance);
    localStorage.setItem('apiTokenInstance', user.apiTokenInstance);
  };

  const checkCodeResponse = (code: string) => {
    return Number(code) !== StatusCodes.FORBIDDEN && Number(code) !== StatusCodes.CONFLICT;
  };

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  });

  useEffect(() => {
    if (user.idInstance && user.apiTokenInstance) {
      dispatch(fetchUser({ idInstance: user.idInstance, apiTokenInstance: user.apiTokenInstance }));
    }
  }, []);

  useEffect(() => {
    if (stateInstance === 'authorized') {
      navigate('/chat');
      setLocalStorage();
    }
    if (error && checkCodeResponse(error.code)) {
      throw new Error(error.message);
    }
  }, [stateInstance, error]);

  return (
    <Spinner>
      <main className={cl.home}>
        <Login />
      </main>
    </Spinner>
  );
};

export default HomePage;

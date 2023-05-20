import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './home.module.scss';
import Login from '../../components/LogInForm';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchUser } from '../../store/reducers/actionCreators';
import Spinner from '../../components/Spinner';

const HomePage: React.FC = () => {
  const { stateInstance, user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setLocalStorage = () => {
    localStorage.setItem('idInstance', user.idInstance);
    localStorage.setItem('apiTokenInstance', user.apiTokenInstance);
  };

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
  }, [stateInstance]);

  return (
    <Spinner>
      <main className={cl.home}>
        <Login />
      </main>
    </Spinner>
  );
};

export default HomePage;

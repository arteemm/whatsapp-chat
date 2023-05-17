import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './main.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { fetchUser } from '../../store/reducers/actionCreators';

const MainPage: React.FC = () => {
  const { idInstance, apiTokenInstance } = useAppSelector((state) => state.user.user);
  const { stateInstance } = useAppSelector((state) => state.user);
  const { setIdInstance, setTokenInstance } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (stateInstance === 'authorized') {
      navigate('/chat');
    }
  }, [stateInstance]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(fetchUser({ idInstance, apiTokenInstance }));
  };

  const changeIdInstance = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIdInstance(e.target.value));
  };

  const changeTokenInstance = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTokenInstance(e.target.value));
  };

  return (
    <main className={cl.main}>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="id" value={idInstance} onChange={changeIdInstance} />
          <input
            type="text"
            placeholder="key"
            value={apiTokenInstance}
            onChange={changeTokenInstance}
          />
          <button type="submit"></button>
        </form>
      </div>
    </main>
  );
};

export default MainPage;

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { fetchUser } from '../../store/reducers/actionCreators';
import cl from './login.module.scss';

const Login: React.FC = () => {
  const { idInstance, apiTokenInstance } = useAppSelector((state) => state.user.user);
  const { setIdInstance, setTokenInstance } = userSlice.actions;
  const dispatch = useAppDispatch();

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

  const description = `Для выполнения запросов HTTP API WhatsApp требуется использовать параметры доступа к Аккаунту.Параметры доступа публикуются в Личном кабинете:

  idInstance - уникальный номер аккаунта
  apiTokenInstance - ключ доступа аккаунта.
  Условием входа является подтверждение авторизации аккаунта`;

  return (
    <form className={cl.login} onSubmit={handleSubmit}>
      <p className={cl.login__description}>{description}</p>
      <input
        className={cl.login__input}
        type="text"
        placeholder="Введите IdInstance"
        value={idInstance}
        onChange={changeIdInstance}
      />
      <input
        type="text"
        placeholder="Введите apiTokenInstance"
        value={apiTokenInstance}
        onChange={changeTokenInstance}
        className={cl.login__input}
      />
      <button className={cl.login__button} type="submit">
        Войти
      </button>
    </form>
  );
};

export default Login;

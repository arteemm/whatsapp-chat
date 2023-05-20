import React, { useState } from 'react';
import { chatSlice } from '../../store/reducers/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './createChatForm.module.scss';

const CreateChatForm: React.FC = () => {
  const [error, setError] = useState(false);
  const { number } = useAppSelector((store) => store.chat);
  const { setNumber, createNumber } = chatSlice.actions;
  const dispatch = useAppDispatch();

  const getNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    dispatch(setNumber(e.target.value));
  };

  const createChat = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!/^(0|[1-9]\d*)$/.test(number)) throw new Error();

      dispatch(createNumber(`${number}@c.us`));
      dispatch(setNumber(''));
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const description =
    'Введите номер телефона получателя с кодом страны и без знака +. Затем нажмите Enter и автоматически создастся чат';

  return (
    <form className={cl['create-chat']} onSubmit={createChat}>
      <p className={cl['create-chat__description']}>{description}</p>
      <p className={`${cl['create-chat__error']} ${error ? null : 'hidden'}`}>
        можно вводить только цифры
      </p>
      <input
        maxLength={20}
        required
        type="text"
        placeholder="Введите телефон"
        value={number}
        onChange={getNumber}
      />
    </form>
  );
};
export default CreateChatForm;

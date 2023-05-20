import React from 'react';
import { chatSlice } from '../../store/reducers/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const CreateChatForm: React.FC = () => {
  const { number } = useAppSelector((store) => store.chat);
  const { setNumber, createNumber } = chatSlice.actions;
  const dispatch = useAppDispatch();

  const getNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNumber(e.target.value));
  };

  const createChat = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createNumber(`${number}@c.us`));
  };

  return (
    <form onSubmit={createChat}>
      <input type="text" placeholder="write number" value={number} onChange={getNumber} />
    </form>
  );
};
export default CreateChatForm;

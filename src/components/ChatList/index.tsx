import React, { useEffect, useRef } from 'react';
import { MessageItem } from '../../types';
import { chatSlice } from '../../store/reducers/chatSlice';
import { useAppDispatch } from '../../hooks/redux';
import cl from './chatList.module.scss';

type MessageListProps = {
  chatsList: { [key: string]: MessageItem[] };
};

const ChatList: React.FC<MessageListProps> = (props) => {
  const dispatch = useAppDispatch();
  const { setCurrentNumber } = chatSlice.actions;
  const divRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (divRef.current) divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const choseChat = (number: string) => {
    dispatch(setCurrentNumber(number));
  };

  return (
    <div className={cl[`chat-list`]}>
      <p>Чаты</p>
      <div className={cl[`chat-list__chats`]}>
        {Object.keys(props.chatsList).map((number, index) => {
          return (
            <button
              ref={divRef}
              className={cl[`chat-list__chat`]}
              key={index}
              onClick={() => choseChat(number)}
            >
              {`${number}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default ChatList;

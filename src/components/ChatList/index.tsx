import React from 'react';
import { MessageItem } from '../../types';
import { chatSlice } from '../../store/reducers/chatSlice';
import { useAppDispatch } from '../../hooks/redux';

type MessageListProps = {
  chatsList: { [key: string]: MessageItem[] };
};

const ChatList: React.FC<MessageListProps> = (props) => {
  const dispatch = useAppDispatch();
  const { setCurrentNumber } = chatSlice.actions;

  const choseChat = (number: string) => {
    dispatch(setCurrentNumber(number));
  };

  return (
    <div>
      {Object.keys(props.chatsList).map((number, index) => {
        return (
          <button key={index} onClick={() => choseChat(number)}>
            {`${number}`}
          </button>
        );
      })}
    </div>
  );
};
export default ChatList;

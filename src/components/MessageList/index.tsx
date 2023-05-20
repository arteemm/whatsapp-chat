import React from 'react';
import { MessageItem } from '../../types';
import cl from './messageList.module.scss';

type MessageListProps = {
  messageList: MessageItem[];
};

const MessageList: React.FC<MessageListProps> = (props) => {
  return (
    <div className={cl[`message-list`]}>
      {props.messageList.map((message, index) => {
        const className =
          message.typeMessage === 'sentMessage' ? 'message_sent' : 'message_received';
        return (
          <div className={cl[`message-list__${className}`]} key={index}>
            <p className={cl[`message-list__message`]}> {message.message} </p>
          </div>
        );
      })}
    </div>
  );
};
export default MessageList;

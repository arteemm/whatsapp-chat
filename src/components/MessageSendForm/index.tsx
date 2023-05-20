import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { sendMessage } from '../../api';
import { chatSlice } from '../../store/reducers/chatSlice';

type MessageSendFormProps = {
  formClassName: string;
  inputClassName: string;
};

const MessageSendForm: React.FC<MessageSendFormProps> = (props) => {
  const [sentMessage, setSentMessage] = useState('');
  const { currentNumber } = useAppSelector((store) => store.chat);
  const { idInstance, apiTokenInstance } = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();
  const { setChatsList } = chatSlice.actions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentNumber) return;
    try {
      const request = await sendMessage({
        idInstance,
        apiTokenInstance,
        chatId: currentNumber,
        message: sentMessage,
      });
      if (request?.idMessage) {
        dispatch(
          setChatsList([
            currentNumber,
            {
              message: sentMessage,
              typeMessage: 'sentMessage',
            },
          ])
        );
      }
    } catch (err) {
      console.log(err);
    }
    setSentMessage('');
  };
  return (
    <form className={props.formClassName} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите сообщение"
        value={sentMessage}
        onChange={(e) => setSentMessage(e.target.value)}
        className={props.inputClassName}
      />
    </form>
  );
};
export default MessageSendForm;

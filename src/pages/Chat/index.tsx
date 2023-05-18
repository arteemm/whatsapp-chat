import React, { useState, useEffect } from 'react';
import { chatSlice } from '../../store/reducers/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { sendMessage, getNotification, deleteNotification } from '../../api';

const ChatPage: React.FC = () => {
  const { number } = useAppSelector((store) => store.chat);
  const { idInstance, apiTokenInstance } = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();
  const { setNumber } = chatSlice.actions;
  const [message, setMessage] = useState('');

  const getNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNumber(e.target.value));
    console.log(333);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage({ idInstance, apiTokenInstance, chatId: number, message });
  };

  const respond = async () => {
    let response;
    try {
      while ((response = await getNotification({ idInstance, apiTokenInstance }))) {
        const { body, receiptId } = response;
        if (body.typeWebhook === 'outgoingAPIMessageReceived') {
          console.log('incomingMessageReceived');
          console.log('MESSAGE: ', body.messageData.extendedTextMessageData.text);
        } else if (body.typeWebhook === 'incomingMessageReceived') {
          console.log('incomingMessageReceived');
          console.log('Incoming MESSAGE: ', body.messageData.textMessageData.textMessage);
        } else if (body.typeWebhook === 'stateInstanceChanged') {
          console.log('stateInstanceChanged');
          console.log(`stateInstance=${body.stateInstance}`);
        } else if (body.typeWebhook === 'deviceInfo') {
          console.log('deviceInfo');
          console.log(`status=${body.deviceData}`);
        }
        await deleteNotification({ idInstance, apiTokenInstance, receiptId });
      }
    } catch (err) {
      console.log('Exception', err);
    }
  };

  return (
    <main>
      <input type="text" placeholder="write number" value={number} onChange={getNumber} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      <button onClick={() => respond()}>respond</button>
    </main>
  );
};

export default ChatPage;

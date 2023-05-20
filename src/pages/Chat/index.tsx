import React, { useEffect } from 'react';
import { chatSlice } from '../../store/reducers/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cl from './chat.module.scss';
import MessageSendForm from '../../components/MessageSendForm';
import MessageList from '../../components/MessageList';
import ChatList from '../../components/ChatList';
import CreateChatForm from '../../components/CreateChatForm';
import { getNotification, deleteNotification } from '../../api';

const ChatPage: React.FC = () => {
  const { chatsList, currentNumber } = useAppSelector((store) => store.chat);
  const { idInstance, apiTokenInstance } = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();
  const { setChatsList } = chatSlice.actions;

  useEffect(() => {
    requestNotification();
  }, []);

  const requestNotification = async () => {
    try {
      let response;
      while ((response = await getNotification({ idInstance, apiTokenInstance }))) {
        const { body, receiptId } = response;
        if (body.typeWebhook === 'incomingMessageReceived') {
          dispatch(
            setChatsList([
              body.senderData.sender,
              {
                message: body.messageData.textMessageData.textMessage,
                typeMessage: 'receivedMessage',
              },
            ])
          );
        }
        await deleteNotification({ idInstance, apiTokenInstance, receiptId });
      }
    } catch (err) {
      console.log('Exception', err);
    }
  };

  const description = 'для получения ответа нажмите кномку "Получить уведомления"';

  return (
    <main className={cl.chat}>
      <div className={cl.chat__menu}>
        <CreateChatForm />
        <p className={cl.chat__description}>{description}</p>
        <button className={cl.chat__notifications} onClick={() => requestNotification()}>
          Получить уведомления
        </button>
        <ChatList chatsList={chatsList} />
      </div>
      <div className={cl.chat__container}>
        {chatsList[currentNumber] ? (
          <>
            <MessageList messageList={chatsList[currentNumber]} />
            <MessageSendForm formClassName={cl.chat__sendForm} inputClassName={cl.chat__input} />
          </>
        ) : null}
      </div>
    </main>
  );
};

export default ChatPage;

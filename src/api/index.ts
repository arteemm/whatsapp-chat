import { UserParameters, ChatParameters, DeleteNotification } from '../types';
import { instance } from './request';

export const getUser = async (props: UserParameters) => {
  const { idInstance, apiTokenInstance } = props;
  const request = await instance.get(
    `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
  );

  return request.data;
};

export const sendMessage = async (props: ChatParameters) => {
  const { idInstance, apiTokenInstance } = props;
  const data = { chatId: `${props.chatId}@c.us`, message: props.message };
  const request = await instance.post(
    `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    data
  );

  return request.data;
};

export const getNotification = async (props: UserParameters) => {
  const { idInstance, apiTokenInstance } = props;
  const request = await instance.get(
    `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
  );

  return request.data;
};

export const deleteNotification = async (props: DeleteNotification) => {
  const { idInstance, apiTokenInstance, receiptId } = props;
  const request = await instance.delete(
    `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
  );

  return request.data;
};

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
  const data = { chatId: props.chatId, message: props.message };
  const request = await instance.post(
    `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    data
  );

  return request.data;
};

export const getNotification = async (props: UserParameters) => {
  try {
    const { idInstance, apiTokenInstance } = props;
    const request = await instance.get(
      `waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );
    return request.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteNotification = async (props: DeleteNotification) => {
  const { idInstance, apiTokenInstance, receiptId } = props;
  const request = await instance.delete(
    `waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
  );

  return request.data;
};

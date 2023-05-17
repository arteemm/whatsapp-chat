import { UserParameters } from '../types';
import { instance } from './request';

export const getUser = async (props: UserParameters) => {
  const { idInstance, apiTokenInstance } = props;
  const request = await instance.get(
    `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
  );

  return request.data;
};

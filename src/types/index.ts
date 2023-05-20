export interface UserParameters {
  idInstance: string;
  apiTokenInstance: string;
}

export interface ChatParameters extends UserParameters {
  chatId: string;
  message: string;
}

export interface DeleteNotification extends UserParameters {
  receiptId: number;
}

export type MessageItem = {
  message: string;
  typeMessage: string;
};

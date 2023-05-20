import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSendMessage } from './actionCreators';
import { MessageItem } from '../../types';

interface StateTypeUser {
  number: string;
  chatsList: {
    [key: string]: MessageItem[];
  };
  currentNumber: string;
  loading: boolean;
  error: { message: string; code: string } | null;
}

const initialState: StateTypeUser = {
  number: '',
  chatsList: {},
  currentNumber: '',
  loading: true,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chatSLice',
  initialState,
  reducers: {
    setNumber: (state: StateTypeUser, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
    createNumber: (state: StateTypeUser, action: PayloadAction<string>) => {
      if (!state.chatsList[action.payload]) {
        state.chatsList[action.payload] = [];
      }
    },
    setChatsList: (state: StateTypeUser, action: PayloadAction<[string, MessageItem]>) => {
      if (!state.chatsList[action.payload[0]]) {
        state.chatsList[action.payload[0]] = [];
      }
      state.chatsList[action.payload[0]].push(action.payload[1]);
    },
    setCurrentNumber: (state: StateTypeUser, action: PayloadAction<string>) => {
      state.currentNumber = action.payload;
    },
  },
  extraReducers: {
    [fetchSendMessage.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchSendMessage.fulfilled.type]: (
      state: StateTypeUser,
      action: PayloadAction<{ stateInstance: string }>
    ) => {
      state.loading = false;
    },
    [fetchSendMessage.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.number = '';
    },
  },
});

export default chatSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatParameters } from '../../types';
import { fetchSendMessage } from './actionCreators';

interface StateTypeUser {
  number: string;
  loading: boolean;
  error: { message: string; code: string } | null;
}

const initialState: StateTypeUser = {
  number: '',
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
      console.log(action.payload);
    },
    [fetchSendMessage.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.number = '';
    },
  },
});

export default chatSlice.reducer;

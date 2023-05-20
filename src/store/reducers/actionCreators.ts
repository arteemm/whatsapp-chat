import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, sendMessage } from '../../api';

export const fetchUser = createAsyncThunk('user/authorized', getUser);
export const fetchSendMessage = createAsyncThunk('chat/sendMessage', sendMessage);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../api';

export const fetchUser = createAsyncThunk('user/authorized', getUser);

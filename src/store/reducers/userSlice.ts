import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserParameters } from '../../types';
import { fetchUser } from './actionCreators';

interface StateTypeUser {
  user: UserParameters;
  stateInstance: string;
  loading: boolean;
  error: { message: string; code: string } | null;
}

const initialState: StateTypeUser = {
  user: {
    idInstance: localStorage.getItem('idInstance') || '',
    apiTokenInstance: localStorage.getItem('apiTokenInstance') || '',
  },
  stateInstance: 'notAuthorized',
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'userSLice',
  initialState,
  reducers: {
    setIdInstance: (state: StateTypeUser, action: PayloadAction<string>) => {
      state.user.idInstance = action.payload;
    },
    setTokenInstance: (state: StateTypeUser, action: PayloadAction<string>) => {
      state.user.apiTokenInstance = action.payload;
    },
    setStateInstance: (state: StateTypeUser, action: PayloadAction<string>) => {
      state.stateInstance = action.payload;
    },
    resetError: (state: StateTypeUser) => {
      state.error = null;
    },
  },
  extraReducers: {
    [fetchUser.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUser.fulfilled.type]: (
      state: StateTypeUser,
      action: PayloadAction<{ stateInstance: string }>
    ) => {
      state.loading = false;
      state.stateInstance = action.payload.stateInstance;
    },
    [fetchUser.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.user = {
        idInstance: '',
        apiTokenInstance: '',
      };
      state.stateInstance = 'notAuthorized';
    },
  },
});

export default userSlice.reducer;

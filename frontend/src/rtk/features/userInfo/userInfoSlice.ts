import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getCookie } from '@/resources/Cookie/CookieMethods';

export interface UserInfoSliceState {
  userLoading: boolean;
  userName: string;
  organizationName: string;
  userInfoError: string;
}

const initialState: UserInfoSliceState = {
  userLoading: true,
  userName: '',
  organizationName: '',
  userInfoError: '',
};

export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfoSlice', async () => {
  return await axios
    .get('/authfront/api/v1/profile/user')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(String(error.response.data));
    });
});

const userInfoSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        const dataObject = action.payload;
        state.userName = dataObject.userName;
        state.organizationName = dataObject.organizationName;
        state.userLoading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.userInfoError = action.error.message ?? 'Unknown error';
      });
  },
});

export default userInfoSlice.reducer;

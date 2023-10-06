import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface SliceState {
    navn: string;
  beskrivelse: string;
  selected: string;
}

const initialState: SliceState = {
    navn: 'test-initial',
    beskrivelse: 'test-initial', 
    selected: 'test-initial',
};

/* Not sure if CreationPage needs to fetch information
export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfoSlice', async () => {
  return await axios
    .get('/authfront/api/v1/profile/user')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(String(error.response.data));
    });
});
*/

const creationPageSlice = createSlice({
  name: 'creation',
  initialState,
  reducers: {
    lagreKnapper : (state, action) => {
        state.navn = action.payload.navn;
        state.beskrivelse = action.payload.beskrivelse;
        state.selected = action.payload.selected;
    }
  },
});

export default creationPageSlice.reducer;
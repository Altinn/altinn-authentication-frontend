import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// FIX-ME: muligens omskrives slik at navn, beskrivelse og selected
// blir tilgjengelig/dispatch i det fokus mistes, a la MaskinportenPage
// Foreløpig er det useState Local State som bærer de 3 tilgjengelige verdiene
// som blir sendt til BFF

export interface SliceState {
  navn: string;
  beskrivelse: string;
  selected: string;
  posted: boolean;
  creationError: string;
}

const initialState: SliceState = {
    navn: '',
    beskrivelse: '', 
    selected: '',
    posted: false,
    creationError: '',
};

// CreationShape form is based on Swagger POST description per 25.10.23
export interface CreationRequest {
  integrationTitle: string,
  description: string,
  selectedSystemType: string,
  clientId: string,
  ownedByPartyId: string
}

// OK let the CreationPage populate the systemUserInfo object,
// and just accept the object as input here and post it on to BFF
// seems to work: that is, the POST goes through, and the GET list
// shows another member in list, but the attributes are "test1", "test2" etc... OK
export const postNewSystemUser = createAsyncThunk('creationPageSlice/postNewSystemUser', 
  async (systemUserInfo: CreationRequest) => {
  return await axios
    .post('/authfront/api/v1/systemuser', systemUserInfo)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(String(error.response.data));
    });
});


const creationPageSlice = createSlice({
  name: 'creation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postNewSystemUser.fulfilled, (state) => {
        state.posted = true;
      })
      .addCase(postNewSystemUser.rejected, (state, action) => {
        state.creationError = action.error.message ?? 'Unknown error';
      })
  },
});

export default creationPageSlice.reducer;

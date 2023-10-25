import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// FIX-ME: må omskrives slik at navn, beskrivelse og selected
// blir tilgjengelig/dispatch i det fokus mistes, a la MaskinportenPage
// ---> Opprett-knapp bør også inaktiveres til de 3 datapunktene er klare

// slik det er i dag så er det en knapp som flytter data til Redux...

export interface SliceState {
  navn: string;
  beskrivelse: string;
  selected: string;
}

const initialState: SliceState = {
    navn: '',
    beskrivelse: '', 
    selected: '',
};

// CreationShape form is based on Swagger POST description per 25.10.23
export interface CreationRequest {
  integrationTitle: string,
  description: string,
  selectedSystemType: string,
  clientId: string,
  ownedByPartyId: string
}

// temporary form of post call: based on postApiDelegation in AccMan
// and Swagger POST /authfront/api/v1/systemuser
// problem is that Request body in Swagger requires 5 key:value pairs
// while we only have navn, beskrivelse and selected so far...
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

// foreløpig lagreOpprettKnapp skal senere gi API POST kall til BFF
const creationPageSlice = createSlice({
  name: 'creation',
  initialState,
  reducers: {
    lagreOpprettKnapp : (state, action) => {
        state.navn = action.payload.navn;
        state.beskrivelse = action.payload.beskrivelse;
        state.selected = action.payload.selected;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewSystemUser.fulfilled, (state, action) => {
        state.systemUserArray = downLoadedArray;
        state.overviewLoaded = true;
      })
      .addCase(postNewSystemUser.rejected, (state, action) => {
        state.overviewError = action.error.message ?? 'Unknown error';
      })
  },
});

export default creationPageSlice.reducer;
export const { lagreOpprettKnapp } = creationPageSlice.actions;

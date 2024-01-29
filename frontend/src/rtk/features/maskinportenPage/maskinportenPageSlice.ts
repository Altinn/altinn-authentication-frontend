import { createSlice } from '@reduxjs/toolkit';

export interface MaskinportenPageSliceState {
  navn: string;
  beskrivelse: string;
  onJwkFileAvailable: boolean;
}

const initialState: MaskinportenPageSliceState = {
  navn: '',
  beskrivelse: '',
  onJwkFileAvailable: false,
};

// foreløpig lagreNavnBeskrivelseKnapp skal senere gi API POST kall til BFF
// Dette blir komplisert av opplasting av certificate fil fra lokal maskin
// som må være fullført på dette tidspunktet
const maskinportenPageSlice = createSlice({
  name: 'maskinporten',
  initialState,
  reducers: {
    lagreNavn: (state, action) => {
      state.navn = action.payload.navn;
    },
    lagreBeskrivelse: (state, action) => {
      state.beskrivelse = action.payload.beskrivelse;
    },
    bekreftJwkTilgjengelighet: (state, action) => {
      state.onJwkFileAvailable = action.payload.onJwkFileAvailable;
    },
    clearStateAfterApi: (state) => {
      state.navn = '';
      state.beskrivelse = '';
      state.onJwkFileAvailable = false;
    },
  },
});

export default maskinportenPageSlice.reducer;
export const { lagreNavn, lagreBeskrivelse, bekreftJwkTilgjengelighet, clearStateAfterApi } =
  maskinportenPageSlice.actions;

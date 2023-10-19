import { createSlice } from '@reduxjs/toolkit';

export interface SliceState {
  navn: string;
  beskrivelse: string;
  onJwkFileAvailable: boolean
}

const initialState: SliceState = {
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
    lagreNavn : (state, action) => {
        state.navn = action.payload.navn;
    },
    lagreBeskrivelse : (state, action) => {
      state.beskrivelse = action.payload.beskrivelse;
    },
    bekreftJwkTilgjengelighet : (state, action) => {
      state.onJwkFileAvailable = action.payload.onJwkFileAvailable;
    }
  },
});

export default maskinportenPageSlice.reducer;
export const { lagreNavn, lagreBeskrivelse, bekreftJwkTilgjengelighet } = maskinportenPageSlice.actions;

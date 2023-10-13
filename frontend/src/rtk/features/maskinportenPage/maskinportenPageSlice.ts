import { createSlice } from '@reduxjs/toolkit';

export interface SliceState {
  navn: string;
beskrivelse: string;
}

const initialState: SliceState = {
    navn: '',
    beskrivelse: '', 
};

// foreløpig lagreNavnBeskrivelseKnapp skal senere gi API POST kall til BFF
// Dette blir komplisert av opplasting av certificate fil fra lokal maskin
// som må være fullført på dette tidspunktet
const maskinportenPageSlice = createSlice({
  name: 'maskinporten',
  initialState,
  reducers: {
    lagreNavnBeskrivelseKnapp : (state, action) => {
        state.navn = action.payload.navn;
        state.beskrivelse = action.payload.beskrivelse;
    }
  },
});

export default maskinportenPageSlice.reducer;
export const { lagreNavnBeskrivelseKnapp } = maskinportenPageSlice.actions;

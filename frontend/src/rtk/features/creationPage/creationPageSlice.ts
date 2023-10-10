import { createSlice } from '@reduxjs/toolkit';

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
});

export default creationPageSlice.reducer;
export const { lagreOpprettKnapp } = creationPageSlice.actions;

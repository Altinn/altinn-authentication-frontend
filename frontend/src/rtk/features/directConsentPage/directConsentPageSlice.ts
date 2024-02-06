import { createSlice } from '@reduxjs/toolkit';

export interface DirectConsentPageSliceState {
  checkbox1: boolean;
  checkbox2: boolean;
  consentGiven: boolean;
}

const initialState: DirectConsentPageSliceState = {
  checkbox1: false,
  checkbox2: false,
  consentGiven: false,
};

// could just invert booleans instead of payload: but design is not final
const directConsentPageSlice = createSlice({
  name: 'directconsent',
  initialState,
  reducers: {
    storeCheckbox1: (state, action) => {
      state.checkbox1 = action.payload.checkbox1;
    },
    storeCheckbox2: (state, action) => {
      state.checkbox2 = action.payload.checkbox2;
    },
    storeConsentGiven: (state, action) => {
      state.consentGiven = action.payload.consentGiven;
    },
    clearStateAfterApi: (state) => {
      state.checkbox1 = false;
      state.checkbox2 = false;
      state.consentGiven = false;
    },
  },
});

export default directConsentPageSlice.reducer;
export const { storeCheckbox1, storeCheckbox2, storeConsentGiven, clearStateAfterApi } =
  directConsentPageSlice.actions;

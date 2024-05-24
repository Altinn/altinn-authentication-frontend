import { createSlice } from '@reduxjs/toolkit';

export interface CreateSystemUserState {
  integrationTitle: string;
  selectedSystemType: string;
  newlyCreatedId: string;
}

const initialState: CreateSystemUserState = {
  integrationTitle: '',
  selectedSystemType: '',
  newlyCreatedId: '',
};

const createSystemUserSlice = createSlice({
  name: 'createSystemUserSlice',
  initialState,
  reducers: {
    setIntegrationTitle: (state, action: { payload: string }) => {
      state.integrationTitle = action.payload;
    },
    setSelectedSystemType: (state, action: { payload: string }) => {
      state.selectedSystemType = action.payload;
    },
    setCreatedId: (state, action: { payload: string }) => {
      state.newlyCreatedId = action.payload;
    },
  },
});

export default createSystemUserSlice.reducer;
export const { setIntegrationTitle, setSelectedSystemType, setCreatedId } =
  createSystemUserSlice.actions;

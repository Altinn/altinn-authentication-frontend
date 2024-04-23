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
    setCreateValues: (
      state,
      action: { payload: { integrationTitle: string; selectedSystemType: string } },
    ) => {
      state.integrationTitle = action.payload.integrationTitle;
      state.selectedSystemType = action.payload.selectedSystemType;
    },
    setCreatedId: (state, action: { payload: string }) => {
      state.newlyCreatedId = action.payload;
    },
  },
});

export default createSystemUserSlice.reducer;
export const { setCreateValues, setCreatedId } = createSystemUserSlice.actions;

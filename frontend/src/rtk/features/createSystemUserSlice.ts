import { createSlice } from '@reduxjs/toolkit';

export interface CreateSystemUserState {
  integrationTitle: string;
  selectedSystemType: string;
}

const initialState: CreateSystemUserState = {
  integrationTitle: '',
  selectedSystemType: '',
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
  },
});

export default createSystemUserSlice.reducer;
export const { setCreateValues } = createSystemUserSlice.actions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    setSelectedSystemType: (
      state,
      action: PayloadAction<{ systemId: string; friendlySystemName: string }>,
    ) => {
      state.selectedSystemType = action.payload.systemId;
      state.integrationTitle = action.payload.friendlySystemName;
    },
    setCreatedId: (state, action: PayloadAction<string>) => {
      state.newlyCreatedId = action.payload;
    },
  },
});

export default createSystemUserSlice.reducer;
export const { setSelectedSystemType, setCreatedId } = createSystemUserSlice.actions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CreateSystemUserState {
  integrationTitle: string;
  selectedSystemId: string;
  newlyCreatedId: string;
}

const initialState: CreateSystemUserState = {
  integrationTitle: '',
  selectedSystemId: '',
  newlyCreatedId: '',
};

const createSystemUserSlice = createSlice({
  name: 'createSystemUserSlice',
  initialState,
  reducers: {
    setSelectedSystemId: (
      state,
      action: PayloadAction<{ systemId: string; friendlySystemName: string }>,
    ) => {
      state.selectedSystemId = action.payload.systemId;
      state.integrationTitle = action.payload.friendlySystemName;
    },
    setCreatedId: (state, action: PayloadAction<string>) => {
      state.newlyCreatedId = action.payload;
    },
  },
});

export default createSystemUserSlice.reducer;
export const { setSelectedSystemId, setCreatedId } = createSystemUserSlice.actions;

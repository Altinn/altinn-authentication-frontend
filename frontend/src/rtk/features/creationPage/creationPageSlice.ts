import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// FIX-ME: muligens omskrives slik at navn, beskrivelse og selected
// blir tilgjengelig/dispatch i det fokus mistes, a la MaskinportenPage
// Foreløpig er det useState Local State som bærer de tilgjengelige verdiene
// som blir sendt til BFF

export interface SystemRegisterObjectDTO {
  systemTypeId: string;
  systemVendor: string;
  description: string;
}

export interface CreationPageSliceState {
  systemRegisterVendorsArray: SystemRegisterObjectDTO[];
  systemRegisterVendorsLoaded: boolean;
  systemRegisterError: string;
  postConfirmed: boolean;
  creationError: string;
  postConfirmationId: string;
}

const initialState: CreationPageSliceState = {
  systemRegisterVendorsArray: [],
  systemRegisterVendorsLoaded: false,
  systemRegisterError: '',
  postConfirmed: false,
  creationError: '',
  postConfirmationId: '',
};

// Update 08.01.23: CreationRequest form is simplified to two key:value pairs
export interface CreationRequest {
  integrationTitle: string;
  selectedSystemType: string;
}

export const fetchSystemRegisterVendors = createAsyncThunk(
  'creation/fetchCreationPageSlice',
  async () => {
    return await axios
      .get('/authfront/api/v1/systemregister')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error(String(error.response.data));
      });
  },
);

// The CreationPage populate the systemUserInfo object,
// The object is here just input and is posted on to BFF
export const postNewSystemUser = createAsyncThunk(
  'creationPageSlice/postNewSystemUser',
  async (systemUserInfo: CreationRequest) => {
    return await axios
      .post('/authfront/api/v1/systemuser', systemUserInfo)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error(String(error.response.data));
      });
  },
);

const creationPageSlice = createSlice({
  name: 'creation',
  initialState,
  reducers: {
    resetPostConfirmation: (state) => {
      state.postConfirmed = false;
      state.postConfirmationId = '';
      // skrevet av Github Copilot
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemRegisterVendors.fulfilled, (state, action) => {
        const dataArray: SystemRegisterObjectDTO[] = action.payload;

        state.systemRegisterVendorsArray = dataArray;
        state.systemRegisterVendorsLoaded = true;
      })
      .addCase(fetchSystemRegisterVendors.rejected, (state, action) => {
        state.systemRegisterError = action.error.message ?? 'Unknown error';
      })
      .addCase(postNewSystemUser.fulfilled, (state, action) => {
        state.postConfirmed = true;
        state.postConfirmationId = action.payload.id;
      })
      .addCase(postNewSystemUser.rejected, (state, action) => {
        state.creationError = action.error.message ?? 'Unknown error';
      });
  },
});

export const { resetPostConfirmation } = creationPageSlice.actions; // Github Copilot
export default creationPageSlice.reducer;

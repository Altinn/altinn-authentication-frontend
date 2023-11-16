import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// FIX-ME: muligens omskrives slik at navn, beskrivelse og selected
// blir tilgjengelig/dispatch i det fokus mistes, a la MaskinportenPage
// Foreløpig er det useState Local State som bærer de 3 tilgjengelige verdiene
// som blir sendt til BFF

export interface SystemRegisterObjectDTO {
  systemTypeId: string;
  systemVendor: string;
  description: string;
}

export interface SystemRegisterObjectPresented {
  label: string;
  value: string;
}

export interface SliceState {
  systemRegisterVendorsArray: SystemRegisterObjectPresented[];
  systemRegisterVendorsLoaded: boolean;
  systemRegisterError: string;
  postConfirmed: boolean;
  creationError: string;
  postConfirmationId: string;
}

const initialState: SliceState = {
    systemRegisterVendorsArray: [],
    systemRegisterVendorsLoaded: false,
    systemRegisterError: '',
    postConfirmed: false,
    creationError: '',
    postConfirmationId: '',
};

// CreationRequest form is based on Swagger POST description per 25.10.23
export interface CreationRequest {
  integrationTitle: string,
  description: string,
  selectedSystemType: string,
  clientId: string,
  ownedByPartyId: string
}

export const fetchSystemRegisterVendors = createAsyncThunk('creation/fetchCreationPageSlice', async () => {
  return await axios
    .get('/authfront/api/v1/systemregister')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(String(error.response.data));
    });
});


// OK let the CreationPage populate the systemUserInfo object,
// and just accept the object as input here and post parameter on to BFF
export const postNewSystemUser = createAsyncThunk('creationPageSlice/postNewSystemUser', 
  async (systemUserInfo: CreationRequest) => {
  return await axios
    .post('/authfront/api/v1/systemuser', systemUserInfo)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(String(error.response.data));
    });
});


const creationPageSlice = createSlice({
  name: 'creation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemRegisterVendors.fulfilled, (state, action) => {
        const dataArray = action.payload;
        const downLoadedArray: SystemRegisterObjectPresented[] = [];

        for (let i = 0; i < dataArray.length; i++) {
          const systemTypeId = dataArray[i].systemTypeId;
          const systemVendor = dataArray[i].systemVendor;
          // const description = dataArray[i].description; // not in use per 15.11.23

          /* const loopObject = {
              systemTypeId,
              systemVendor,
              description,
            };
            */
          // transform to DesignSystem PullDownMenu shape
          // we do not use "description" (so far: designers might )
          const loopObject2 = {
            'label': `${systemTypeId} : ${systemVendor}`,
            'value': `${systemTypeId} : ${systemVendor}`
          }

          downLoadedArray.push(loopObject2);
        }

        state.systemRegisterVendorsArray = downLoadedArray;
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
      })
  },
});

export default creationPageSlice.reducer;

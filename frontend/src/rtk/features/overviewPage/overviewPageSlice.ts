import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// import { getCookie } from '@/resources/Cookie/CookieMethods';

// Ny standard SystemUserObjectsDTO fra Swagger 25.10.23
// Se også issue 23 for ny form på objekt

export interface SystemUserObjectDTO {
  id: string;
  integrationTitle: string;
  description: string;
  productName: string;
  supplierName: string;
  supplierOrgno: string;
  ownedByPartyId: string;
  created: string;
}
// FIX-ME: tror key:value par created:Date; med fordel kan legges til senere
// det er lettere med en ren String-array i første omgang

// FIX-ME: "supplierOrgno" er feilformet, skal egentlig være "supplierOrgNo"
// i følge issue 23: kommenterte dette review i dag

export interface OverviewPageSliceState {
  systemUserArray: SystemUserObjectDTO[];
  overviewLoaded: boolean;
  overviewError: string;
}

const initialState: OverviewPageSliceState = {
  systemUserArray: [],
  overviewLoaded: false,
  overviewError: '',
};

// URL er hardkodet til GET "0" i Swagger ---> fix-me senere
export const fetchOverviewPage = createAsyncThunk('overview/fetchOverviewPageSlice', async () => {
  return await axios
    .get('/authfront/api/v1/systemuser/0')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(String(error.response.data));
    });
});

const overviewPageSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewPage.fulfilled, (state, action) => {
        const dataArray: SystemUserObjectDTO[] = action.payload;

        state.systemUserArray = dataArray;
        state.overviewLoaded = true;
      })
      .addCase(fetchOverviewPage.rejected, (state, action) => {
        state.overviewError = action.error.message ?? 'Unknown error';
      });
  },
});

export default overviewPageSlice.reducer;

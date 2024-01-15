import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface SystemRegisterProductObjectDTO {
  right: string;
  serviceProvider: string;
}

export interface SliceState {
  systemRegisterProductsArray: SystemRegisterProductObjectDTO[];
  systemRegisterProductsLoaded: boolean;
  systemRegisterProductError: string;
}

const initialState: SliceState = {
  systemRegisterProductsArray: [],
  systemRegisterProductsLoaded: false,
  systemRegisterProductError: '',
};

export const fetchSystemRegisterProducts = createAsyncThunk('rightsincluded/fetchRightsIncludedPageSlice', async () => {
  return await axios
    .get('/authfront/api/v1/systemregister/product/1')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(String(error.response.data));
    });
});

const rightsIncludedPageSlice = createSlice({
  name: 'rightsincluded',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemRegisterProducts.fulfilled, (state, action) => {
        const dataArray = action.payload;
        const downLoadedArray: SystemRegisterProductObjectDTO[] = [];

        for (let i = 0; i < dataArray.length; i++) {
          const right = dataArray[i].right;
          const serviceProvider = dataArray[i].serviceProvider;
         
          const loopObject = {
            right,
            serviceProvider
          }
          downLoadedArray.push(loopObject);
        }

        state.systemRegisterProductsArray = downLoadedArray;
        state.systemRegisterProductsLoaded = true;
      })
      .addCase(fetchSystemRegisterProducts.rejected, (state, action) => {
        state.systemRegisterProductError = action.error.message ?? 'Unknown error';
      })
  }
});

export default rightsIncludedPageSlice.reducer;

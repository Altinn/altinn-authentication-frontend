import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// import { getCookie } from '@/resources/Cookie/CookieMethods';

// new overviewPageSlice
// will reflect API call to Swagger GET /systemuser/{id}
// but also Runes new SystemUserObject (see Wiki update 23.10.23)
// The OverviewPage has a list of SystemUserObjects

// based on userInfoSlice code and array code from 
// delegableApiSlice.ts AccMan repo

export interface SystemUserObject {
    id: string;
    title: string;
    description: string;
    systemType: string;
    ownedBy: string;
    controlledBy: string;
  }
// FIX-ME: tror key:value par created:Date; med fordel kan legges til senere
// det er lettere med en ren String-array i første omgang
 
export interface SliceState {
  systemUserArray: SystemUserObject[];
  overviewLoaded: boolean;
  overviewError: string;
}

const initialState: SliceState = {
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
        const dataArray = action.payload;
        const downLoadedArray: SystemUserObject[] = [];

        for (let i = 0; i < dataArray.length; i++) {
            const id = dataArray[i].id;
            const title = dataArray[i].title;
            const description = dataArray[i].description;
            const systemType = dataArray[i].systemType;
            const ownedBy = dataArray[i].ownedBy;
            const controlledBy = dataArray[i].controlledBy;
            const loopObject = {
                id,
                title,
                description,
                systemType,
                ownedBy,
                controlledBy,
            };
            downLoadedArray.push(loopObject);
        }

        state.systemUserArray = downLoadedArray;
        state.overviewLoaded = true;
      })
      .addCase(fetchOverviewPage.rejected, (state, action) => {
        state.overviewError = action.error.message ?? 'Unknown error';
      })
  },
});

export default overviewPageSlice.reducer;

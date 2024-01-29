import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userInfoReducer, { UserInfoSliceState } from '../features/userInfo/userInfoSlice';
import overviewPageReducer, {
  OverviewPageSliceState,
} from '../features/overviewPage/overviewPageSlice';
import creationPageReducer, {
  CreationPageSliceState,
} from '../features/creationPage/creationPageSlice';
import maskinportenPageReducer, {
  MaskinportenPageSliceState,
} from '../features/maskinportenPage/maskinportenPageSlice';
import directConsentPageReducer, {
  DirectConsentPageSliceState,
} from '../features/directConsentPage/directConsentPageSlice';
import rightsIncludedPageSlice, {
  RightsIncludedPageSliceState,
} from '../features/rightsIncludedPage/rightsIncludedPageSlice';

const logger = createLogger();

// turn off redux-logger in production
const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    overviewPage: overviewPageReducer,
    creationPage: creationPageReducer,
    maskinportenPage: maskinportenPageReducer,
    directConsentPage: directConsentPageReducer,
    rightsIncludedPage: rightsIncludedPageSlice,
  },
  ...(!import.meta.env.PROD && {
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  }),
});

export default store;
export type RootState = {
  userInfo: UserInfoSliceState;
  overviewPage: OverviewPageSliceState;
  creationPage: CreationPageSliceState;
  maskinportenPage: MaskinportenPageSliceState;
  directConsentPage: DirectConsentPageSliceState;
  rightsIncludedPage: RightsIncludedPageSliceState;
};
export type AppDispatch = typeof store.dispatch;

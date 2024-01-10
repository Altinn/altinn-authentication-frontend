import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userInfoReducer from '../features/userInfo/userInfoSlice';
import overviewPageReducer from '../features/overviewPage/overviewPageSlice';
import creationPageReducer from '../features/creationPage/creationPageSlice';
import maskinportenPageReducer from '../features/maskinportenPage/maskinportenPageSlice';
import directConsentPageReducer from '../features/directConsentPage/directConsentPageSlice';
import rightsIncludedPageSlice from '../features/rightsIncludedPage/rightsIncludedPageSlice';

const logger = createLogger();

// turn off redux-logger in production
const store = import.meta.env.PROD
  ? configureStore({
      reducer: {
        userInfo: userInfoReducer,
        overviewPage: overviewPageReducer,
        creationPage: creationPageReducer,
        maskinportenPage: maskinportenPageReducer,
        directConsentPage: directConsentPageReducer,
        rightsIncludedPage: rightsIncludedPageSlice,
      },
    })
  : configureStore({
      reducer: {
        userInfo: userInfoReducer,
        overviewPage: overviewPageReducer,
        creationPage: creationPageReducer,
        maskinportenPage: maskinportenPageReducer,
        directConsentPage: directConsentPageReducer,
        rightsIncludedPage: rightsIncludedPageSlice,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

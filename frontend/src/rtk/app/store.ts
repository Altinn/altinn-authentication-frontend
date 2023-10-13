import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userInfoReducer from '../features/userInfo/userInfoSlice';
import creationPageReducer from '../features/creationPage/creationPageSlice';
import maskinportenPageReducer from '../features/maskinportenPage/maskinportenPageSlice';

const logger = createLogger();

// turn off redux-logger in production
const store = import.meta.env.PROD
  ? configureStore({
      reducer: {
        userInfo: userInfoReducer,
        creationPage: creationPageReducer,
        maskinportenPage: maskinportenPageReducer,
      },
    })
  : configureStore({
      reducer: {
        userInfo: userInfoReducer,
        creationPage: creationPageReducer,
        maskinportenPage: maskinportenPageReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

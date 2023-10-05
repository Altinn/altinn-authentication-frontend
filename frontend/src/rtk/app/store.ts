import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userInfoReducer from '../features/userInfo/userInfoSlice';

const logger = createLogger();

// turn off redux-logger in production
const store = import.meta.env.PROD
  ? configureStore({
      reducer: {
        userInfo: userInfoReducer,
      },
    })
  : configureStore({
      reducer: {
        userInfo: userInfoReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

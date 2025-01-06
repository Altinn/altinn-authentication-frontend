import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { api } from '../features/api';

const logger = createLogger();

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleWares = getDefaultMiddleware().concat(api.middleware);
    // turn off redux-logger in production
    if (!import.meta.env.PROD) {
      return middleWares.concat(logger);
    }
    return middleWares;
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSystemUserReducer, { CreateSystemUserState } from '../features/createSystemUserSlice';
import { api } from '../features/api';

const logger = createLogger();

// turn off redux-logger in production
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    createSystemUser: createSystemUserReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleWares = getDefaultMiddleware().concat(api.middleware);
    if (!import.meta.env.PROD) {
      return middleWares.concat(logger);
    }
    return middleWares;
  },
});

export default store;
export type RootState = {
  createSystemUser: CreateSystemUserState;
};
export type AppDispatch = typeof store.dispatch;

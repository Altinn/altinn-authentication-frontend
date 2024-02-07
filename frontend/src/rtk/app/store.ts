import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import maskinportenPageReducer, {
  MaskinportenPageSliceState,
} from '../features/maskinportenPageSlice';
import createSystemUserReducer, { CreateSystemUserState } from '../features/createSystemUserSlice';
import { systemUserApi } from '../features/systemUserApi';

const logger = createLogger();

// turn off redux-logger in production
const store = configureStore({
  reducer: {
    [systemUserApi.reducerPath]: systemUserApi.reducer,
    maskinportenPage: maskinportenPageReducer,
    createSystemUser: createSystemUserReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleWares = getDefaultMiddleware().concat(systemUserApi.middleware);
    if (!import.meta.env.PROD) {
      return middleWares.concat(logger);
    }
    return middleWares;
  },
});

export default store;
export type RootState = {
  maskinportenPage: MaskinportenPageSliceState;
  createSystemUser: CreateSystemUserState;
};
export type AppDispatch = typeof store.dispatch;

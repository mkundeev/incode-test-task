import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { financeAPI } from './financeAPI';


export const store = configureStore({
  reducer: {
    [financeAPI.reducerPath]: financeAPI.reducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(financeAPI.middleware),
});



setupListeners(store.dispatch);
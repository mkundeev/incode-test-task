import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { financeAPI } from './financeAPI';
import  trickersSlice from './reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'userConfig',
  storage,
};
const persReducer = persistReducer(persistConfig, trickersSlice.reducer);


export const store = configureStore({
  reducer: {
    [trickersSlice.name]: persReducer,
    [financeAPI.reducerPath]: financeAPI.reducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(financeAPI.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
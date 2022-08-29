import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import {
  tikersType,
  tikersFilterType,
  sendTickersType,
} from '../utils/ts-types';
export const financeAPI = createApi({
  reducerPath: 'finaceAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
  }),
  endpoints: builder => ({
    getDataForTicker: builder.query({
      query: ticker => ({
        url: `data/${ticker}`,
      }),
    }),
    getData: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = io('http://localhost:4000');
          socket.emit('start');
          socket.on('ticker', function (response) {
            updateCachedData(draft => {
              draft = response;
              return draft;
            });
          });
          await cacheEntryRemoved;
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendTickers: builder.mutation({
      queryFn: (tickersFilter: tikersFilterType) => {
        const socket = io('http://localhost:4000');
        return new Promise<sendTickersType>(resolve => {
          socket.emit('changeTickers', tickersFilter, (data: tikersType[]) => {
            resolve({ data });
          });
        });
      },
    }),
  }),
});

export const {
  useGetDataQuery,
  useSendTickersMutation,
  useGetDataForTickerQuery,
} = financeAPI;

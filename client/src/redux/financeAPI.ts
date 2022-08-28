import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import { tikersType, tikersFilterType } from '../utils/ts-types';
export const financeAPI = createApi({
  reducerPath: 'finaceAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
  }),
  tagTypes: ['Tickers'],
  endpoints: builder => ({
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
        return new Promise(resolve => {
          socket.emit(
            'changeTickers',
            tickersFilter,
            (response: tikersType[]) => {
              resolve({ data: response });
            }
          );
        });
      },
    }),
  }),
});

export const { useGetDataQuery, useSendTickersMutation } = financeAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";
export const financeAPI = createApi({
  reducerPath: "finaceAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  tagTypes: ["Tickers"],
  endpoints: (builder) => ({
    getData: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = io("http://localhost:4000");
          socket.emit("start");
          socket.on("ticker", function (response) {
            const res = Array.isArray(response) ? response : [response];

            updateCachedData((draft: any[]): any => {
              draft = res;
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
      queryFn: (tickers) => {
        const socket = io("http://localhost:4000");
        return new Promise((resolve) => {
          socket.emit("changeTickers", tickers, (response) => {
            resolve({ data: response });
          });
        });
        },
    }),
    getTickers: builder.query({
      query: () => ({
        url: `/tickers`,
      }),
      providesTags: ["Tickers"],
    }),
  }),
});

export const {
  useGetDataQuery,
  useLazyGetTickersQuery,
  useSendTickersMutation,
} = financeAPI;

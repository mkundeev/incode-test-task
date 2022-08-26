import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
export const financeAPI = createApi({
    reducerPath: 'finaceAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
    }),
    endpoints: builder => ({
        getData: builder.query({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(_,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData},
            ) {
                try {
                    await cacheDataLoaded;
                    const socket = io('http://localhost:4000');
                    socket.emit('start');
                    socket.on('ticker', function (response) {
                        const res = Array.isArray(response) ? response : [response];
                        console.log(res)
                        updateCachedData((draft: any[]):any => {
                            draft=res
                            return draft
                        })
                    });
                    await cacheEntryRemoved;
                } catch(err) {
                    console.log(err)
                }
            }
        })
    })
})

export const {
 useGetDataQuery   
}=financeAPI
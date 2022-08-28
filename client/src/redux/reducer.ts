import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trickersFilter: [
  { AAPL: true},
  { GOOGL: true },
  { MSFT: true },
  { AMZN: true },
  { FB: true},
  { TSLA: true },
    ]
};

const trickersSlice = createSlice({
  name: 'trickers',
  initialState,
  reducers: {
    setTrikersFilterReducer: (state, { payload }) => {
      console.log(payload)
      return {...state, ...payload};
    },
    
  },
});

export const {
  setTrikersFilterReducer
} = trickersSlice.actions;
export default trickersSlice;

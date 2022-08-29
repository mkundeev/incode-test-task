import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type tikersType = {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
};
export type tikersFilterType = { [x: string]: boolean }[];

export type amountSortType = {
  price?: boolean;
  change?: boolean;
  change_percent?: boolean;
  dividend?: boolean;
  yield?: boolean;
};

export type sendTickersType = {
  data: tikersType[];
};

export type useGetDataType = {
  data: tikersType[];
  isLoading: boolean;
};

export type dataType = {
  data?: tikersType[];
  error?: FetchBaseQueryError | SerializedError;
};

// ===========History page==============//

export type tickersHistoryType = {
  _id: string;
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
};
export type useGetDataHistoryType = {
  data: { data: tickersHistoryType[] };
  isLoading: boolean;
};

import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { changeColorOnValue, dateToLocalTime } from '../../utils/data-formatin';
import s from './TickerTable.module.css';
const dat = [
  {
    _id: '630cd878b27c1f4678f23047',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 276.81,
    change: -6.98,
    change_percent: -2.52,
    dividend: 0.22,
    yield: 0.55,
    last_trade_time: '2022-08-29T12:17:12.000Z',
  },
  {
    _id: '630cd878b27c1f4678f23045',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 116.53,
    change: 15.07,
    change_percent: 12.93,
    dividend: 0.75,
    yield: 0.93,
    last_trade_time: '2022-08-29T12:17:12.000Z',
  },
  {
    _id: '630cd882b27c1f4678f23049',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 291.42,
    change: 7.17,
    change_percent: 2.46,
    dividend: 0.66,
    yield: 1.44,
    last_trade_time: '2022-08-29T12:17:22.000Z',
  },
  {
    _id: '630cd885b27c1f4678f2304f',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 222.46,
    change: 13.77,
    change_percent: 6.19,
    dividend: 0.39,
    yield: 0.36,
    last_trade_time: '2022-08-29T12:17:25.000Z',
  },
  {
    _id: '630cd88cb27c1f4678f2305b',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 104.96,
    change: 14.34,
    change_percent: 13.66,
    dividend: 0.56,
    yield: 0.39,
    last_trade_time: '2022-08-29T12:17:32.000Z',
  },
  {
    _id: '630cd896b27c1f4678f23067',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 213.05,
    change: 8.09,
    change_percent: 3.8,
    dividend: 0.81,
    yield: 1.94,
    last_trade_time: '2022-08-29T12:17:42.000Z',
  },
  {
    _id: '630cd8a0b27c1f4678f23073',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 265.82,
    change: 2.58,
    change_percent: 0.97,
    dividend: 0.32,
    yield: 0.78,
    last_trade_time: '2022-08-29T12:17:52.000Z',
  },
  {
    _id: '630cd8aab27c1f4678f2307f',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 262.04,
    change: -5.35,
    change_percent: -2.04,
    dividend: 0.27,
    yield: 1.15,
    last_trade_time: '2022-08-29T12:18:02.000Z',
  },
  {
    _id: '630cd8b4b27c1f4678f2308b',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 182.72,
    change: 9.22,
    change_percent: 5.05,
    dividend: 0.36,
    yield: 0.36,
    last_trade_time: '2022-08-29T12:18:12.000Z',
  },
  {
    _id: '630cd8beb27c1f4678f23097',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 262.67,
    change: 10.69,
    change_percent: 4.07,
    dividend: 0.73,
    yield: 0.23,
    last_trade_time: '2022-08-29T12:18:22.000Z',
  },
  {
    _id: '630cd8c8b27c1f4678f230a3',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 294.09,
    change: -3.27,
    change_percent: -1.11,
    dividend: 0.6,
    yield: 0.68,
    last_trade_time: '2022-08-29T12:18:32.000Z',
  },
  {
    _id: '630cd8d2b27c1f4678f230af',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 226.47,
    change: 6.22,
    change_percent: 2.75,
    dividend: 0.13,
    yield: 2,
    last_trade_time: '2022-08-29T12:18:42.000Z',
  },
  {
    _id: '630cd8dcb27c1f4678f230bb',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 126.84,
    change: 5.16,
    change_percent: 4.07,
    dividend: 0.73,
    yield: 1.24,
    last_trade_time: '2022-08-29T12:18:52.000Z',
  },
  {
    _id: '630cd8e6b27c1f4678f230c7',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 278.35,
    change: 11.66,
    change_percent: 4.19,
    dividend: 0.43,
    yield: 0.59,
    last_trade_time: '2022-08-29T12:19:02.000Z',
  },
  {
    _id: '630cd8f0b27c1f4678f230d3',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 243.5,
    change: 14.31,
    change_percent: 5.88,
    dividend: 0.75,
    yield: 1.07,
    last_trade_time: '2022-08-29T12:19:12.000Z',
  },
  {
    _id: '630ce07ac32a202b9a0a71ec',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 184.07,
    change: -8.85,
    change_percent: -4.81,
    dividend: 0.36,
    yield: 0.79,
    last_trade_time: '2022-08-29T12:51:22.000Z',
  },
  {
    _id: '630ce084c32a202b9a0a71f8',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 188.18,
    change: 5.72,
    change_percent: 3.04,
    dividend: 0.5,
    yield: 0.73,
    last_trade_time: '2022-08-29T12:51:32.000Z',
  },
  {
    _id: '630ce08ec32a202b9a0a7204',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 129.73,
    change: -6.33,
    change_percent: -4.88,
    dividend: 0.04,
    yield: 1.74,
    last_trade_time: '2022-08-29T12:51:42.000Z',
  },
  {
    _id: '630ce098c32a202b9a0a7210',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 232.9,
    change: 13.5,
    change_percent: 5.8,
    dividend: 0.47,
    yield: 0.33,
    last_trade_time: '2022-08-29T12:51:52.000Z',
  },
  {
    _id: '630ce0a2c32a202b9a0a721c',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 262.3,
    change: 11.3,
    change_percent: 4.31,
    dividend: 0.01,
    yield: 0.41,
    last_trade_time: '2022-08-29T12:52:02.000Z',
  },
  {
    _id: '630ce0acc32a202b9a0a7228',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 107.52,
    change: 3.14,
    change_percent: 2.92,
    dividend: 0.82,
    yield: 0.75,
    last_trade_time: '2022-08-29T12:52:12.000Z',
  },
  {
    _id: '630ce0b6c32a202b9a0a7234',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 273.27,
    change: 19.45,
    change_percent: 7.12,
    dividend: 0.64,
    yield: 1.64,
    last_trade_time: '2022-08-29T12:52:22.000Z',
  },
];
export default function TickerTable({ data }) {
  const [amountSort, setAmountSort] = useState({});
  const [dataForTicker, setDataForTicker] = useState(data);

  useEffect(() => {
    setDataForTicker(data);
  }, [data]);
  const sortByAmount = property => {
    let filterdData = [];
    if (!amountSort.hasOwnProperty(property)) {
      setAmountSort({ [property]: false });
    }
    if (amountSort[property]) {
      filterdData = [...data].sort((a, b) => a[property] - b[property]);
      setAmountSort({ [property]: false });
    } else {
      filterdData = [...data].sort((a, b) => b[property] - a[property]);
      setAmountSort({ [property]: true });
    }

    setDataForTicker(filterdData);
  };
  return (
    <>
      <h2>Ticker</h2>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          padding="normal"
          size="small"
          aria-label="simple table"
          className={s.table}
          data-testid="table"
        >
          <TableHead>
            <TableRow className={s.headerRow}>
              <TableCell align="center" className={s.headerCell}>
                Exchange
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: 'pointer' }}
                className={s.headerCell}
                onClick={() => sortByAmount('price')}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: 'pointer' }}
                className={s.headerCell}
                onClick={() => sortByAmount('change')}
              >
                Change
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: 'pointer' }}
                className={s.headerCell}
                onClick={() => sortByAmount('change_percent')}
              >
                Change persent
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: 'pointer' }}
                className={s.headerCell}
                onClick={() => sortByAmount('dividend')}
              >
                Devident
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: 'pointer' }}
                className={s.headerCell}
                onClick={() => sortByAmount('yield')}
              >
                Yield
              </TableCell>
              <TableCell align="center" className={s.headerCell}>
                Last trade time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tableBody">
            {dataForTicker?.map(row => (
              <TableRow
                key={row.ticker}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                role="checkbox"
                className={s.tableRow}
              >
                <TableCell align="center">{row.exchange}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center" sx={changeColorOnValue(row.change)}>
                  {row.change}
                </TableCell>
                <TableCell
                  align="center"
                  sx={changeColorOnValue(row.change_percent)}
                >
                  {row.change_percent} %
                </TableCell>
                <TableCell align="center">{row.dividend}</TableCell>
                <TableCell align="center">{row.yield}</TableCell>
                <TableCell align="center">
                  {dateToLocalTime(row.last_trade_time)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

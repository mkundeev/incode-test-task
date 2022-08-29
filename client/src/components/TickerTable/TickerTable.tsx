import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { changeColorOnValue, dateToLocalTime } from '../../utils/data-formatin';
import s from './TickerTable.module.css';

export default function TickerTable({ data }) {
  const [amountSort, setAmountSort] = useState({});
  const [dataForTicker, setDataForTicker] = useState(data.data);

  useEffect(() => {
    setDataForTicker(data.data);
  }, [data]);
  const sortByAmount = property => {
    let filterdData = [];
    if (!amountSort.hasOwnProperty(property)) {
      setAmountSort({ [property]: false });
    }
    if (amountSort[property]) {
      filterdData = [...dataForTicker].sort(
        (a, b) => a[property] - b[property]
      );
      setAmountSort({ [property]: false });
    } else {
      filterdData = [...dataForTicker].sort(
        (a, b) => b[property] - a[property]
      );
      setAmountSort({ [property]: true });
    }

    setDataForTicker(filterdData);
  };
  return (
    <>
      <Link to={`/`}>Back to main</Link>
      <h2>{dataForTicker[0]?.ticker}</h2>
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
              <TableCell
                align="center"
                className={s.headerCell}
                sx={{ cursor: 'pointer' }}
              >
                Trade time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tableBody">
            {dataForTicker?.map(row => (
              <TableRow
                key={row._id}
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

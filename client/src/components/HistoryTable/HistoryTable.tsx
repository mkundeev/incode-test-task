import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { changeColorOnValue, dateToLocalTime } from '../../utils/data-formatin';
import { tickersHistoryType, amountSortType } from '../../utils/ts-types';
import s from '../FinanceTable/Table.module.css';

export default function HistoryTable(prop: { data: tickersHistoryType[] }) {
  const { data } = prop;
  console.log(data);
  const [amountSort, setAmountSort] = useState<amountSortType>({});
  const [dataForTicker, setDataForTicker] = useState(data);
  const [dateSort, setDateSort] = useState(true);

  useEffect(() => {
    setDataForTicker(data);
  }, [data]);

  const sortByDate = () => {
    let filterdData = [];
    if (dateSort) {
      filterdData = [...dataForTicker].sort((a, b) => {
        const newDateA = new Date(a.last_trade_time).getTime();
        const newDateB = new Date(b.last_trade_time).getTime();
        return newDateB - newDateA;
      });
      setDateSort(!dateSort);
    } else {
      filterdData = [...dataForTicker].sort((a, b) => {
        const newDateA = new Date(a.last_trade_time).getTime();
        const newDateB = new Date(b.last_trade_time).getTime();
        return newDateA - newDateB;
      });
      setDateSort(!dateSort);
    }

    setDataForTicker(filterdData);
  };
  const sortByAmount = (property: keyof amountSortType) => {
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
      <Link to={`/`} className={s.linkToMain} data-testid="linkToMain">
        Back to main
      </Link>
      {data.length !== 0 ? (
        <>
          <h2 className={s.header}>{dataForTicker[0]?.ticker}</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              padding="normal"
              size="small"
              aria-label="simple table"
              className={s.table}
              data-testid="tableHistory"
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
                    onClick={sortByDate}
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
                    <TableCell
                      align="center"
                      sx={changeColorOnValue(row.change)}
                    >
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
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
}

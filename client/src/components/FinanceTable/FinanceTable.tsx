import React, {  useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import {useSendTickersMutation  } from '../../redux/financeAPI'
import { changeColororOnValue, dateToLocalTime } from '../../utils/data-formatin';
import { filterInitState } from '../../utils/fiter-init-state';
import s from './FinanceTable.module.css'


export default function FinanceTable({ data }) {
  const anchorCategory = document.querySelector('#filtrTicker');
  const [sendTickers]=useSendTickersMutation()
  const [amountSort, setAmountSort] = useState({})
 const [tickersFilter, setTickersFilter] = useState(filterInitState);
  const [transactions, setTransactions] = useState([]);

  const [isMenuTickerOpen, setIsMenuTickerOpen] = useState(false);
 
  useEffect(() => {
    setTransactions(data);
  }, [data]);



  const sortByAmount = (property:string) => {
    let filterdTransactions = [];
    if (!amountSort.hasOwnProperty(property)) {
      setAmountSort({[property]:false})
    }
    if (amountSort[property]) {
      filterdTransactions = [...data].sort(
        (a, b) => a[property] - b[property]
      );
      setAmountSort({[property]:false});
    } else {
      filterdTransactions = [...data].sort(
        (a, b) => b[property]- a[property]
      );
      setAmountSort({[property]:true});
    }

    setTransactions(filterdTransactions);
  };


   const handleSetTickersFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
   const newFiltervalue=tickersFilter.map((obj) =>
   {
     if (obj.hasOwnProperty(event.target.name)) {
         obj[event.target.name] = event.target.checked
          return obj
        }
        return obj
      }
    )
      setTickersFilter(newFiltervalue)
  };

  const filterByTickers = async () => {
    if (tickersFilter.filter((obj) => Object.values(obj)[0]) === 0) {
      return
    }
    await sendTickers(tickersFilter);
    setIsMenuTickerOpen(false);
  }

  const handleResetTickers = async () => {
    setTickersFilter(filterInitState)
  }



  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} padding='normal' size="small" aria-label="simple table" className={s.table}>
        <TableHead>
          <TableRow >
            <TableCell className={s.headerCell} id="filtrTicker" onClick={() => {
                setIsMenuTickerOpen(true);
              }}>Ticker</TableCell>
            <TableCell align='center'>Exchange</TableCell>
            <TableCell align='center'className={s.headerCell} onClick={()=>sortByAmount('price')}>Price</TableCell>
            <TableCell align='center' className={s.headerCell}onClick={() => sortByAmount('change')}>Change</TableCell>
            <TableCell align='center' className={s.headerCell}onClick={() => sortByAmount('change_percent')}>Change persent</TableCell>
            <TableCell align='center'  className={s.headerCell}onClick={() => sortByAmount('dividend')}>Devident</TableCell>
            <TableCell align='center' className={s.headerCell}onClick={() => sortByAmount('yield')}>Yield</TableCell>
            <TableCell align='center' ><p>Last trade time on</p><p>{data[0]?.last_trade_time.slice(0,10)}</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((row) => (
            <TableRow
              key={row.ticker}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              role="checkbox"
              className={s.tableRow}
            >
              <TableCell component="th" scope="row">
                {row.ticker}
              </TableCell>
              <TableCell align='center' >{row.exchange}</TableCell>
              <TableCell align='center' >{row.price}</TableCell>
              <TableCell align='center' sx={changeColororOnValue(row.change)}>{row.change}</TableCell>
              <TableCell align='center' sx={changeColororOnValue(row.change_percent)}>{row.change_percent} %</TableCell>
              <TableCell align='center'>{row.dividend}</TableCell>
              <TableCell align='center'>{row.yield}</TableCell>
              <TableCell align='center'>{dateToLocalTime(row.last_trade_time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Menu
        id="basic-menu"
        anchorEl={anchorCategory}
        autoFocus={false}
        open={isMenuTickerOpen}
        onClose={() => {
          setIsMenuTickerOpen(false)
        handleResetTickers()}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {tickersFilter.map(el => (
          <MenuItem
            key={Object.keys(el)[0]}
            id={Object.keys(el)[0]}
            sx={{ fontSize: '12px' }}
          ><Checkbox
      checked={Object.values(el)[0]}
      onChange={handleSetTickersFilter}
      name={Object.keys(el)[0]}
    />
            {Object.keys(el)[0]}
          </MenuItem>
        ))}
        <MenuItem
          onClick={filterByTickers}
          key="filter"
          sx={{ fontSize: '14px', justifyContent: 'center'  }}
        >
          Filter
        </MenuItem>
        <MenuItem
          onClick={handleResetTickers}
          key="reset"
          sx={{ fontSize: '14px', justifyContent: 'center' }}
        >
          Reset
        </MenuItem>
      </Menu>
   </div>
  );
}

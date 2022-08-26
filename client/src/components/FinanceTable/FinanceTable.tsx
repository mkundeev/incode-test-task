import React from 'react';
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
import { useState, useEffect } from 'react';

import s from './FinanceTable.module.css'


const changeColororOnValue = (value:number) => {
 return value<0?{ color: 'red'}:{ color: 'green'}
}
const dateToLocalTime = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString()
}

export default function FinanceTable({ data }) {
  
  const [amountSort, setAmountSort] = useState({});
  const [dateSort, setDateSort] = useState(true);
 const [tickersFilter, setTickersFilter] = useState([]);

  const [isMenuTickerOpen, setIsMenuTickerOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
 

  useEffect(() => {
    setTickersFilter(
      [...data]
      .map(({ ticker }) => {return {[ticker]:false}})
  );
    setTransactions([...data]);
  }, [data]);


  const sortByDate = () => {
    let filterdTransactions = [];
    if (dateSort) {
      filterdTransactions = [...data].sort((a, b) => {
        const newDateA = new Date(a.date);
        const newDateB = new Date(b.date);
        return newDateB - newDateA;
      });
      setDateSort(!dateSort);
    } else {
      filterdTransactions = [...data].sort((a, b) => {
        const newDateA = new Date(a.date);
        const newDateB = new Date(b.date);
        return newDateA - newDateB;
      });
      setDateSort(!dateSort);
    }

    setTransactions(filterdTransactions);
  };

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

    const filterByTickers = () => {
    const filterValues = tickersFilter.filter(obj => Object.values(obj)[0]).reduce((acc, obj) => { acc.push(Object.keys(obj)[0]);
      return acc
    }, [])
      if (filterValues.length < 1) {
        return
      }

   const filteredTransactions= data.filter(obj=>filterValues.includes(obj.ticker))
    setTransactions(filteredTransactions)
  }

  const handleSetTickersFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTickersFilter(
      tickersFilter.map((obj) =>
      {
        if (obj.hasOwnProperty(event.target.name)) {
          obj[event.target.name] = event.target.checked
          return obj
        }
        return obj
      }
      )
    )
  };
  

 const anchorCategory = document.querySelector('#filtrTicker');

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} padding='normal' size="small" aria-label="simple table" className={s.table}>
        <TableHead>
          <TableRow>
            <TableCell className={s.headerCell} id="filtrTicker" onClick={() => {
                setIsMenuTickerOpen(true);
              }}>Ticker</TableCell>
            <TableCell align='center'>Exchange</TableCell>
            <TableCell align='center'className={s.headerCell} onClick={()=>sortByAmount('price')}>Price</TableCell>
            <TableCell align='center' className={s.headerCell}onClick={() => sortByAmount('change')}>Change</TableCell>
            <TableCell align='center' className={s.headerCell}onClick={() => sortByAmount('change_percent')}>Change persent</TableCell>
            <TableCell align='center'  className={s.headerCell}onClick={() => sortByAmount('dividend')}>Devident</TableCell>
            <TableCell align='center' className={s.headerCell}onClick={() => sortByAmount('yield')}>Yield</TableCell>
            <TableCell align='center' className={s.headerCell}onClick={sortByDate}><p>Last trade time on</p><p>{data[0]?.last_trade_time.slice(0,10)}</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((row) => (
            <TableRow
              key={row.ticker}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              role="checkbox"
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
        onClose={() => setIsMenuTickerOpen(false)}
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
          onClick={() => {
           filterByTickers()
            setIsMenuTickerOpen(false);
          }}
          key="filter"
          sx={{ fontSize: '14px', justifyContent: 'center'  }}
        >
          Filter
        </MenuItem>
        <MenuItem
          onClick={() => {
           setTickersFilter([...data]
             .map(({ ticker }) => { return { [ticker]: false } }))
            setTransactions([...data])
          }}
          key="reset"
          sx={{ fontSize: '14px', justifyContent: 'center' }}
        >
          Reset
        </MenuItem>
      </Menu>
   </div>
  );
}

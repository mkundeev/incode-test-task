import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { useSendTickersMutation } from "../../redux/financeAPI";
import { changeColorOnValue, dateToLocalTime } from "../../utils/data-formatin";

import {
  tikersType,
  tikersFilterType,
  amountSortType,
  dataType,
} from "../../utils/ts-types";

import s from "./Table.module.css";

export default function FinanceTable(prop: { data: tikersType[] }) {
  const { data } = prop;
  const anchorCategory = document.querySelector("#filtrTicker");

  const [sendTickers] = useSendTickersMutation();
  const [amountSort, setAmountSort] = useState<amountSortType>({});
  const [tickersFilter, setTickersFilter] = useState<tikersFilterType>([]);
  const [transactions, setTransactions] = useState<tikersType[]>(data);
  const [isMenuTickerOpen, setIsMenuTickerOpen] = useState(false);

  useEffect(() => {
    const result = localStorage.getItem("tickers");
    if (result) {
      const initialFilterState: tikersFilterType = JSON.parse(result);
      setTickersFilter(initialFilterState);
    } else {
      localStorage.setItem(
        "tickers",
        JSON.stringify([
          { AAPL: false },
          { GOOGL: false },
          { MSFT: false },
          { AMZN: false },
          { FB: false },
          { TSLA: false },
        ])
      );
    }
    setTransactions(data);
  }, [data]);

  const sortByAmount = (property: keyof amountSortType) => {
    let filterdTransactions = [];
    if (!amountSort.hasOwnProperty(property)) {
      setAmountSort({ [property]: false });
    }
    if (amountSort[property]) {
      filterdTransactions = [...data].sort((a, b) => a[property] - b[property]);
      setAmountSort({ [property]: false });
    } else {
      filterdTransactions = [...data].sort((a, b) => b[property] - a[property]);
      setAmountSort({ [property]: true });
    }

    setTransactions(filterdTransactions);
  };

  const handleCheckboxChangeTickers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiltervalue = tickersFilter.map((obj) => {
      if (obj.hasOwnProperty(event.target.name)) {
        obj[event.target.name] = event.target.checked;
        return obj;
      }
      return obj;
    });
    localStorage.setItem("tickers", JSON.stringify(newFiltervalue));
    setTickersFilter(newFiltervalue);
  };

  const filterByCheckedTickers = async () => {
    setIsMenuTickerOpen(false);
    let filterTickers: tikersFilterType;
    if (tickersFilter.filter((obj) => Object.values(obj)[0]).length === 0) {
      filterTickers = [
        { AAPL: true },
        { GOOGL: true },
        { MSFT: true },
        { AMZN: true },
        { FB: true },
        { TSLA: true },
      ];
    } else {
      filterTickers = tickersFilter;
      setTickersFilter(filterTickers);
    }

    try {
      const { data }: dataType = await sendTickers(filterTickers);
      if (!data) {
        return;
      }
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleResetTickers = async () => {
    localStorage.setItem(
      "tickers",
      JSON.stringify([
        { AAPL: false },
        { GOOGL: false },
        { MSFT: false },
        { AMZN: false },
        { FB: false },
        { TSLA: false },
      ])
    );

    setTickersFilter([
      { AAPL: false },
      { GOOGL: false },
      { MSFT: false },
      { AMZN: false },
      { FB: false },
      { TSLA: false },
    ]);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          padding="normal"
          size="small"
          aria-label="simple table"
          className={s.table}
          data-testid="tableMain"
        >
          <TableHead>
            <TableRow className={s.headerRow}>
              <TableCell
                sx={{ cursor: "pointer" }}
                className={s.headerCell}
                id="filtrTicker"
                onClick={() => {
                  setIsMenuTickerOpen(true);
                }}
                data-testid="tickerCell"
              >
                Ticker
              </TableCell>
              <TableCell align="center" className={s.headerCell}>
                Exchange
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: "pointer" }}
                className={s.headerCell}
                onClick={() => sortByAmount("price")}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: "pointer" }}
                className={s.headerCell}
                onClick={() => sortByAmount("change")}
              >
                Change
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: "pointer" }}
                className={s.headerCell}
                onClick={() => sortByAmount("change_percent")}
              >
                Change persent
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: "pointer" }}
                className={s.headerCell}
                onClick={() => sortByAmount("dividend")}
              >
                Devident
              </TableCell>
              <TableCell
                align="center"
                sx={{ cursor: "pointer" }}
                className={s.headerCell}
                onClick={() => sortByAmount("yield")}
              >
                Yield
              </TableCell>
              <TableCell align="center" className={s.headerCell}>
                Last trade time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tableBody">
            {transactions?.map((row) => (
              <TableRow
                key={row.ticker}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                role="checkbox"
                className={s.tableRow}
              >
                <TableCell component="th" scope="row">
                  {row.ticker}
                </TableCell>
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
                  <Link
                    to={`/history/${row.ticker}`}
                    className={s.link}
                    data-testid="linkToHistory"
                  >
                    Look history
                  </Link>
                </TableCell>
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
          "aria-labelledby": "basic-button",
        }}
        data-testid="tickersMenu"
      >
        {tickersFilter.map((el) => (
          <MenuItem
            key={Object.keys(el)[0]}
            id={Object.keys(el)[0]}
            sx={{ fontSize: "12px" }}
          >
            <Checkbox
              checked={Object.values(el)[0]}
              onChange={handleCheckboxChangeTickers}
              name={Object.keys(el)[0]}
            />
            {Object.keys(el)[0]}
          </MenuItem>
        ))}
        <MenuItem
          onClick={filterByCheckedTickers}
          key="filter"
          sx={{ fontSize: "14px", justifyContent: "center" }}
          data-testid="filterBtn"
        >
          Filter
        </MenuItem>
        <MenuItem
          onClick={handleResetTickers}
          key="reset"
          sx={{ fontSize: "14px", justifyContent: "center" }}
        >
          Reset
        </MenuItem>
      </Menu>
      {data?.length === 0 && <p className={s.notFoundMassege}>No data found</p>}
    </>
  );
}

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const data=[
  {
    ticker: "AAPL",
    exchange: "NASDAQ",
    price: 279.29,
    change: 64.52,
    change_percent: 0.84,
    dividend: 0.56,
    yield: 1.34,
    last_trade_time: "2021-04-30T11:53:21.000Z"
  },
  {
    ticker: "GOOGL",
    exchange: "NASDAQ",
    price: 237.08,
    change: 154.38,
    change_percent: 0.1,
    dividend: 0.46,
    yield: 1.18,
    last_trade_time: "2021-04-30T11:53:21.000Z"
  },
  {
    ticker: "MSFT",
    exchange: "NASDAQ",
    price: 261.46,
    change: 161.45,
    change_percent: 0.41,
    dividend: 0.18,
    yield: 0.98,
    last_trade_time: "2021-04-30T11:53:21.000Z"
  },
  {
    ticker: "AMZN",
    exchange: "NASDAQ",
    price: 260.34,
    change: 128.71,
    change_percent: 0.6,
    dividend: 0.07,
    yield: 0.42,
    last_trade_time: "2021-04-30T11:53:21.000Z"
  },
  {
    ticker: "FB",
    exchange: "NASDAQ",
    price: 266.77,
    change: 171.92,
    change_percent: 0.75,
    dividend: 0.52,
    yield: 1.31,
    last_trade_time: "2021-04-30T11:53:21.000Z"
  },
  {
    ticker: "TSLA",
    exchange: "NASDAQ",
    price: 272.13,
    change: 158.76,
    change_percent: 0.1,
    dividend: 0.96,
    yield: 1,
    last_trade_time: "2021-04-30T11:53:21.000Z"
  }
]

export default function FinanceTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell align="right">Exchange</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">Change persent (%)</TableCell>
            <TableCell align="right">Devident</TableCell>
            <TableCell align="right">Yield</TableCell>
            <TableCell align="right">Last trade time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.ticker}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ticker}
              </TableCell>
              <TableCell align="right">{row.exchange}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.change}</TableCell>
              <TableCell align="right">{row.change_percent}</TableCell>
              <TableCell align="right">{row.dividend}</TableCell>
              <TableCell align="right">{row.yield}</TableCell>
              <TableCell align="right">{row.last_trade_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

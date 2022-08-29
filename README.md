# React Test Task

Application display price tickers data on the UI in realtime.
It is possible to sort price, change, change percentage, yield, dividend in ascending and descending order by clicking on the corresponding table header cell.
After clicking on tickers cell a menu will be opened where is possible to choose which tickers to track. Filtering takes place on back-end.
In the last column are located buttons with links to another page where is situated table with the history of the corresponding ticker.
(Now data is limited to 50 last records). In this table it is also possible to sort data in ascending and descending order by date.

Used technologies:
Client: HTML, CSS, JS, TS, React, Redux, React Router, Jest, Socket.io, MUI
Server: Node.js,express, MongoDB, Mongoose, Socket.io

P.S. .env file for connecting to db will be sent via email.

## Running the local service

1. Open a new bash shell
2. `cd server`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`
5. You can visit [http://localhost:4000](http://localhost:4000) to check that the service is working correctly and inspect the data it produces.

## Run your application

1. Open a new bash shell
2. `cd client`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`

## Run the tests

1. Open a new bash shell
2. `cd client`
3. `npm run test` or `yarn test`

# Price Service Usage

URL:
`http://localhost:4000`

Price tickers are real-time via web-sockets.

## Example JSON Response from the Price Ticker service

```json
[
  {
    "ticker": "AAPL",
    "exchange": "NASDAQ",
    "price": 279.29,
    "change": 64.52,
    "change_percent": 0.84,
    "dividend": 0.56,
    "yield": 1.34,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "GOOGL",
    "exchange": "NASDAQ",
    "price": 237.08,
    "change": 154.38,
    "change_percent": 0.1,
    "dividend": 0.46,
    "yield": 1.18,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "MSFT",
    "exchange": "NASDAQ",
    "price": 261.46,
    "change": 161.45,
    "change_percent": 0.41,
    "dividend": 0.18,
    "yield": 0.98,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "AMZN",
    "exchange": "NASDAQ",
    "price": 260.34,
    "change": 128.71,
    "change_percent": 0.6,
    "dividend": 0.07,
    "yield": 0.42,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "FB",
    "exchange": "NASDAQ",
    "price": 266.77,
    "change": 171.92,
    "change_percent": 0.75,
    "dividend": 0.52,
    "yield": 1.31,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "TSLA",
    "exchange": "NASDAQ",
    "price": 272.13,
    "change": 158.76,
    "change_percent": 0.1,
    "dividend": 0.96,
    "yield": 1.0,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  }
]
```

The tickers we use:

- **AAPL** - Apple
- **GOOGL** - Alphabet
- **MSFT** - Microsoft
- **AMZN** - Amazon
- **FB** - Facebook
- **TSLA** - Tesla

## How to complete the task

1. Clone or fork this repository
2. Modify content of the folder `client`
3. Modify content of the folder `server` - if you want to complete bonus tasks
4. Commit and push your code to your repository
5. Send us link to your repository

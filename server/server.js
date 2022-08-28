"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");
const logger = require("morgan");

const FETCH_INTERVAL = 10000;
const PORT = process.env.PORT || 4000;

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

let tickers = [
  { AAPL: true },
  { GOOGL: true },
  { MSFT: true },
  { AMZN: true },
  { FB: true },
  { TSLA: true },
];

async function getQuotes(socket) {
  const quotes = tickers
    .filter((obj) => Object.values(obj)[0])
    .map((ticker) => {
      const price = randomValue(100, 300, 2);
      const change = randomValue(-10, 20, 2);
      const change_percent = Number(((change * 100) / price).toFixed(2));
      return {
        ticker: Object.keys(ticker)[0],
        exchange: "NASDAQ",
        price,
        change,
        change_percent,
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
      };
    });

  socket.emit("ticker", quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());

app.use(logger("combined"));
const server = http.createServer(app);
app.use(express.json());

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });
  socket.on("changeTickers", (arg, callback) => {
    tickers = arg;
    const quotes = tickers
      .filter((obj) => Object.values(obj)[0])
      .map((ticker) => {
        const price = randomValue(100, 300, 2);
        const change = randomValue(-10, 20, 2);
        const change_percent = Number(((change * 100) / price).toFixed(2));
        return {
          ticker: Object.keys(ticker)[0],
          exchange: "NASDAQ",
          price,
          change,
          change_percent,
          dividend: randomValue(0, 1, 2),
          yield: randomValue(0, 2, 2),
          last_trade_time: utcDate(),
        };
      });
    callback(quotes);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});

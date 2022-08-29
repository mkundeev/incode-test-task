'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();
const { dbConnection } = require('./src/db/conection');
const { Data } = require('./src/db/dataSchema');
const dataRouter = require('./src/routes/data');
const { randomizeQuotes } = require('./src/helpers/randomize');

const FETCH_INTERVAL = 10000;
const PORT = process.env.PORT || 4000;

let tickers = [
  { AAPL: true },
  { GOOGL: true },
  { MSFT: true },
  { AMZN: true },
  { FB: true },
  { TSLA: true },
];

async function getQuotes(socket) {
  const quotes = randomizeQuotes(tickers);
  await Data.create(quotes);
  socket.emit('ticker', quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());

app.use(logger('combined'));
const server = http.createServer(app);
app.use(express.json());

app.use('/data', dataRouter);

const socketServer = io(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', socket => {
  socket.on('start', () => {
    trackTickers(socket);
  });
  socket.on('changeTickers', async (arg, callback) => {
    const quotes = randomizeQuotes(arg);
    await Data.create(quotes);
    callback(quotes);
  });
});

server.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log('Database connection successful');
    console.log(`Streaming service is running on http://localhost:${PORT}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
});

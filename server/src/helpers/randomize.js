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

function randomizeQuotes(tickers) {
  return tickers
    .filter(obj => Object.values(obj)[0])
    .map(ticker => {
      const price = randomValue(100, 300, 2);
      const change = randomValue(-10, 20, 2);
      const change_percent = Number(((change * 100) / price).toFixed(2));
      return {
        ticker: Object.keys(ticker)[0],
        exchange: 'NASDAQ',
        price,
        change,
        change_percent,
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
      };
    });
}

module.exports = {
  randomizeQuotes,
};

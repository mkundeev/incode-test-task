const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  exchange: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  change: { type: Number, required: true },
  change_percent: { type: Number, required: true },
  dividend: { type: Number, required: true },
  yield: { type: Number, required: true },
  last_trade_time: { type: Date, required: true },
});

const Data = mongoose.model('data', dataSchema);

module.exports = {
  Data,
};

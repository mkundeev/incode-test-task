const { Data } = require('../db/dataSchema');

const getDataByTicker = async ticker => {
  try {
    return Data.find({ ticker }).limit(50).select('-__v');
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getDataByTicker,
};

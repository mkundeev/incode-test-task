const { getDataByTicker } = require('../model/dataModel');

async function getDataController(req, res) {
  const { ticker } = req.params;
  const data = await getDataByTicker(ticker);
  if (!data) {
    res
      .status(404)
      .json({ message: `Data for ticker:${ticker} does not exist` });
    return;
  }
  res.status(200).json({ data });
}
module.exports = {
  getDataController,
};

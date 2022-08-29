const express = require('express');
const { getDataController } = require('../controllers/dataController');

const { errorHandler } = require('../middlewares/errorHandler');

const router = express.Router();

router.get('/:ticker', errorHandler(getDataController));

module.exports = router;

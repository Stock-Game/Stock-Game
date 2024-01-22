const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const router = express.Router();

router.post('/', portfolioController.buy, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO BUY ROUTER <---');
  return res.status(201).json(res.locals.buy);
});

router.delete('/', portfolioController.sell, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO SELL ROUTER <---');
  return res.status(204).json(res.locals.sell);
});

router.get('/', portfolioController.read, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO READ ROUTER <---');
  // note from Kevin: I changed res.locals.read to res.locals.stockList, since I'm pretty sure that was the intent of
  // whoever wrote this.
  return res.status(200).json(res.locals.stockList);
});

router.get('/sync', portfolioController.sync, (req, res) => {
  return res.status(200).json(res.locals.syncedData);
});

module.exports = router;

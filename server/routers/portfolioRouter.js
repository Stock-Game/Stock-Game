const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const router = express.Router();

router.post('/', portfolioController.buy, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO BUY ROUTER <---');
  return res.status(201);
});

router.delete('/', portfolioController.sell, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO SELL ROUTER <---');
  return res.status(204);
});

router.get('/', portfolioController.read, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO READ ROUTER <---');
  return res.status(200);
});

module.exports = router;

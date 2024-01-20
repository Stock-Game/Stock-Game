const express = require('express');
const portfolio = require('../controllers/portfolioController');
const router = express.Router();

router.post('/', portfolio.buy, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO BUY ROUTER <---');
  return res.status(201);
});

router.delete('/', portfolio.sell, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO SELL ROUTER <---');
});

router.get('/', portfolio.read, (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO READ ROUTER <---');
});

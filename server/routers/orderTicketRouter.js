const express = require('express');
const orderTicket = require('../controllers/orderTicketController');
const router = express.Router();

router.get('/:ticker', orderTicket.getPrice, (req, res) => {
  console.log('---> ENTERING ORDER TICKET GET PRICE ROUTER <---');
  return res.status(200).json(res.locals.getPrice);
});

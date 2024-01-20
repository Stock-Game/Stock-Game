const express = require('express');
const orderTicketController = require('../controllers/orderTicketController');
const router = express.Router();

router.get('/?ticker', orderTicketController.getPrice, (req, res) => {
  console.log('---> ENTERING ORDER TICKET GET PRICE ROUTER <---');
  return res.status(200).json(res.locals.getPrice);
});

module.exports = router;

const express = require('express');
const newsController = require('../controllers/orderTicketController');
const router = express.Router();

router.get('/', newsController.news, (req, res) => {
  console.log('---> ENTERING NEWS ROUTER <---');
  return res.status(200);
});

module.exports = router;

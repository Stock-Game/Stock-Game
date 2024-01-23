const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/', userController.create, (req, res, next) => {
  console.log('---> ENTERING USER CREATE ROUTER <---');
  return res.status(201).json(res.locals.id);
});

router.get('/', userController.verifyUser, (req, res, next) => {
  console.log('---> ENTERING VERIFY USER ROUTER <---');
  return res.status(200).json(res.locals.id);
});

module.exports = router;

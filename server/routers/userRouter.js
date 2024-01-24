const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// routing goal: if signup successful, serve the user's dashboard
router.post('/signup', userController.createUser, (req, res, next) => {
  console.log('---> ENTERING USER CREATE ROUTER <---');
  // options:
  //  backend redirects to a dashboard route, passing along the user id on res:
  //    res.redirect(200, /dashboard);
  //  could also serve up "secret" html directly:
  //    res.sendFile(path.resolve(__dirname, '~/client/dashboard.html'))
  //  or, just send along res id to frontend, and use navigate from there
  //  or, redirect to login after successful signup, like some sites
  return res.status(201).send(res.locals.id);
});

// routing goal: if login successful, serve the user's dashboard
router.post('/login', userController.verifyUser, (req, res, next) => {
  console.log('---> ENTERING VERIFY USER ROUTER <---');
  // same options as above
  // maybe if user exists but pw doesn't match, use locals to tell frontend,
  //  and frontend could be more specific.
  //  but this is less secure!
  return res.status(201).send(res.locals.id);
});

module.exports = router;

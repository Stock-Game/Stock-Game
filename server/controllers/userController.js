const userController = {};
const User = require('../model/userModel.js');

/*
createUser saves a new user from req.body into db
should be routed from signup
req.body should be:
 {
  username: "mario"
  password: "ksldfald"
 }
 assumes error is thrown by db if username is not unique
 */
userController.createUser = async (res, req, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.locals.id = user._id; // unique id created by mongo
    return next();
  } catch (err) {
    return next({
      log: 'error in userController.createUser',
      message: { error: JSON.stringify(err) },
    });
  }
};

/* 
verifyUser finds matching user in db, then authenticates the pw
routed here from login
simple authentication, not encrypted
req.body should be:
 {
  username: "mario"
  password: "awiufnae"
 }
*/
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne(username);

    if (!user) res.locals.userExists = false;
    // verify password
    else if (user.password !== password) {
      // password does not match! what do...
      res.locals.userExists = true;
      res.locals.passwordMatches = false;
      // res.locals.id = data._id;
    } else {
      // user and password match
      res.locals.userExists = true;
      res.locals.passwordMatches = true;
      res.locals.id = data._id;
    }

    return next();
  } catch (err) {
    return next({
      log: 'error in userController.verifyUser',
      message: { error: JSON.stringify(err) },
    });
  }
};

module.exports = userController;

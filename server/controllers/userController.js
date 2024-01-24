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
userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.create({ username, password });
    // const { username } = req.body;
    // const user = await User.create({ username });
    res.locals.id = user._id; // unique id created by mongo
    console.log(user);
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
    console.log('req.body', req.body);
    const { username, password } = req.body;
    // console.log('req.params', req.params);
    const user = await User.findOne({ username, password }); // null if none found
    console.log(user);
    // const { username } = req.body;
    // const user = await User.findOne({ username });

    if (user) res.locals.id = user._id;
    return next();
  } catch (err) {
    return next({
      log: 'error in userController.verifyUser',
      message: { error: JSON.stringify(err) },
    });
  }
};

module.exports = userController;

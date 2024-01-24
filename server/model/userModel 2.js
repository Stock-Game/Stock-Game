const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // TODO: add balance property
  // should also have a property pointing to an associated collection of portfolios
  // perhaps just an array
});

module.exports = mongoose.model('user', userSchema);

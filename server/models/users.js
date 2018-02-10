const db = require('../services/db');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  password: String,
  email: String,
  name: String
});
const modelUser = mongoose.model('users', user);
module.exports = modelUser;

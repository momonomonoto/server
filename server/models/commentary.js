const db = require('../services/db');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentary = new Schema({
  title: String,
  author: String,
  description: String,
  select: Boolean,
  id: Number
});

module.exports = commentary;

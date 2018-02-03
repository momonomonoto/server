const db = require('../services/db');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutCollection = new Schema({
  title: String,
  category: String,
  description: String,
  select: Boolean,
  commentaries: [],
  id: Number,
  _id: String
});

const modelAbout = mongoose.model('aboutCollection', aboutCollection);

module.exports = modelAbout;

const db = require('../services/db');
const mongoose = require('mongoose');
const commentary = require('./commentary');

const Schema = mongoose.Schema;

const project = new Schema({
  title: String,
  category: String,
  description: String,
  select: Boolean,
  commentaries: [],
  id: Number,
  _id: String
});
const modelMongo = mongoose.model('projects', project);
module.exports = modelMongo;

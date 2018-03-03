const db = require('../services/db');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const project = new Schema({
  title: String,
  category: String,
  description: String,
  select: Boolean,
  commentaries: Array,
  id: Number,
  _id: String
},{collection:'projects'});
const modelMongo = mongoose.model('projects', project);
module.exports = modelMongo;

const db = require('../services/db');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutCollection = new Schema({
  title: String,
  description: String,
},{collection:'about'});

const modelAbout = mongoose.model('about', aboutCollection);

module.exports = modelAbout;

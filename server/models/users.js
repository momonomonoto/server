const db = require('../services/db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const user = new Schema({
  password: String,
  email: String,
  name: String
});

user.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(next);
});

const modelUser = mongoose.model('users', user);
module.exports = modelUser;

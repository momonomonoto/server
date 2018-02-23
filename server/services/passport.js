const passport = require('passport');
const modelUser = require('../models/users');
const { Strategy: LocalStrategy } = require('passport-local');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((userId, done) => modelUser.findById(userId, done));
const options = {
  usernameField: 'name',
  passwordField: 'password'
};

passport.use('local-register', new LocalStrategy(options, (name, password, done) => {
  modelUser.create({ name, password })
        .then(user => {
          done(null, user);
        })
        .catch(done);
}));

passport.use('local-login', new LocalStrategy(options, (name, password, done) => {
  modelUser.findOne({ name, password })
        .then(user => {
          if (!user) return done(null, false);
          done(null, user);
        }).catch(done);
}));


module.exports = passport;

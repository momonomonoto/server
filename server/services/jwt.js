const passport = require('passport');
const modelUser = require('../models/users');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../config');

const options = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use( new Strategy(options, (payload, done) => {
    modelUser.findById(payload.id)
        .then(user => {
            if (!user) return done(null, false);

            done(null, user);
        })
        .catch(done);
}));


module.exports = passport;

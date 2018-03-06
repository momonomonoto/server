const modelUser = require('../models/users');
const { jwtSecret } = require('../config');
const jwt = require('jwt-simple');
const passport = require('../services/passport');

module.exports = {
  showAuthForm: (param) => (req, res) => {
    const { formName } = param;
    res.render('authorization/index', { formRestore: true, formName });
  },
  register() {
     return passport.authenticate('local-register', { failureRedirect: '/', successRedirect: '/profile/user' });
  },
  authorization() {
     return passport.authenticate('local-login', { failureRedirect: '/', successRedirect: '/profile/user' });
  },
  getToken(req, res, next) {
    if (!req.body.name || !req.body.password) return res.sendStatus(401);
    modelUser.findOne({ name: req.body.name})
          .then(user => {
            if (!user) return res.sendStatus(401);
            if (!user.isCorrectPassword(req.body.password)) return res.sendStatus(201);

            const payload = { id: user.id };
            const token = jwt.encode(payload, jwtSecret);

            res.json({ token });
          })
          .catch(next);
  },
  logout(req, res) {
    req.session.destroy();
    res.redirect('/profile/user');
  }
};

const modelUser = require('../models/users');
const { jwtSecret } = require('../config');
const jwt = require('jwt-simple');

module.exports = {
  showAuthForm: (param) => (req, res) => {
    const { formName } = param;
    res.render('authorization/index', { formRestore: true, formName });
  },
  register(req, res) {
    const { password, name } = req.body;
    modelUser.create({ name, password })
      .then(user => {
        req.session.userId = user._id;
        res.redirect('/profile/user');
      })
      .catch(() => {
        res.redirect('/');
      });
  },
  authorization(req, res) {
    const { password, name } = req.body;
    modelUser.findOne({ name })
      .then(user => {
        if (!user) throw new Error('user not find');
        req.session.userId = user.id;
        res.redirect('/profile/user');
      })
      .catch((err) => {
          console.log(err,'err');
        res.redirect('/');
      });
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

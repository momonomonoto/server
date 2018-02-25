const modelUser = require('../models/users');

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
    modelUser.findOne({ name, password })
      .then(user => {
        req.session.userId = user.id;
        res.redirect('/profile/user');
      })
      .catch(() => {
        res.redirect('/');
      });
  },
  logout(req, res) {
    req.session.destroy();
    res.redirect('/profile/user');
  }
};

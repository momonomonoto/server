const modelUser = require('../models/users');

module.exports = {
  showProfile(req, res, next) {
    if (Boolean(req.session.passport) === false) {
      return res.render('profile/index', { name: 'not autorized user', email: '' });
    }
    const { session: { passport: { user } } } = req;
    modelUser.findById(user)
     .then(user => {
       res.render('profile/index', { name: user.name, email: user.email });
     })
     .catch(next);
  }
};

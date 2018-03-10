
module.exports = User => ({
  showProfile(req, res, next) {
    if (Boolean(req.session.passport) === false) {
      return res.render('profile/index', { name: 'not autorized user', email: '' });
    }
    const { session: { passport: { user } } } = req;
    User.findById(user)
     .then(user => {
         return res.render('profile/index', { name: user.name, email: user.email });
     })
     .catch(next);
  }
});

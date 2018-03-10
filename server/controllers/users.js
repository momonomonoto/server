const modelUser = require('../models/users');

module.exports = User => ({
  showUsers: (param) => (req, res) => {
    const { apiRequest } = param || false;
    return User.find({}, { name: 1, _id: 0 }).then((users) => {
      if (apiRequest) return res.json(users);
      throw new Error();
    }).catch(err => res.status(500));
  }
});

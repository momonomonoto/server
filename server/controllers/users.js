const modelUser = require('../models/users');

module.exports = {
  showUsers: (param) => (req, res) => {
    const { apiRequest } = param || false;
    modelUser.find().then((users) => {
      if (apiRequest) return res.json(users);
      throw new Error();
    }).catch(err => res.status(500));
  }
};

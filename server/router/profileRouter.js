const { Router } = require('express');
const modelUser = require('../models/users');

const router = Router();

router.get('/', (req, res, next) => {
  modelUser.findById(req.cookies.userId)
        .then(user => {
          res.render('profile/index', { name: user.name, email: user.email });
        })
        .catch(next);
});

module.exports = router;

const express = require('express');
const operationController = require('../controllers/operationController');
const passport = require('../services/passport');

const router = express.Router();
function setRouter() {
  const loginController = operationController.setControllerOperation({ formName: 'Login' });
  router.get('/', loginController.showAuthForm);
  router.post('/', passport.authenticate('local-login', { failureRedirect: '/projects', successRedirect: '/profile' }));
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

const express = require('express');
const operationController = require('../controllers/operationController');
const passport = require('../services/passport');

const router = express.Router();

function setRouter() {
  const registerController = operationController.setControllerOperation({formName: 'Register'});
  router.get('/', registerController.showAuthForm);
  router.post('/', passport.authenticate('local-register', { failureRedirect: '/projects', successRedirect: '/profile' }));
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

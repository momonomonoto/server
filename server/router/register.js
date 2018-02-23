const express = require('express');
const operationController = require('../controllers/index');
const passport = require('../services/passport');

const router = express.Router();

function setRouter() {
  const registerController = operationController.setControllerOperation({formName: 'Register'});
  router.get('/form', registerController.showAuthForm);
  router.post('/form', passport.authenticate('local-register', { failureRedirect: '/', successRedirect: '/profile/user' }));
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

const express = require('express');
const operationController = require('../controllers/index');
const passport = require('../services/passport');

const router = express.Router();
function setRouter() {
  const loginController = operationController.setControllerOperation({ formName: 'Login' });
  router.get('/form', loginController.showAuthForm);
  router.post('/form', loginController.authorization);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

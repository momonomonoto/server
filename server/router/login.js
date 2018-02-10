const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const loginController = operationController.setControllerOperation({formName: 'Login'});
  router.get('/', loginController.showAuthForm);
  router.post('/', loginController.authorization);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

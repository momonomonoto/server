const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const itemController = operationController.setControllerOperation({formName: 'Login'});
  router.get('/', itemController.showAuthForm);
  router.post('/', itemController.authorization);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

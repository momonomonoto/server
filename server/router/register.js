const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const registerController = operationController.setControllerOperation({formName: 'Register'});
  router.get('/', registerController.showAuthForm);
  router.post('/', registerController.register);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

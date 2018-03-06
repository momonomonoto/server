const express = require('express');
const operationController = require('../controllers/index');

const router = express.Router();

function setRouter() {
  const registerController = operationController.setControllerOperation({formName: 'Register'});
  router.get('/form', registerController.showAuthForm);
  router.post('/form', registerController.register());
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

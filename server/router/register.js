const express = require('express');
const operationController = require('../controllers/index');
const modelUser = require('../models/users');

const router = express.Router();

function setRouter() {
  const registerController = operationController.setControllerOperation(modelUser, { formName: 'Register' });
  router.get('/form', registerController.showAuthForm);
  router.post('/form', registerController.register());
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

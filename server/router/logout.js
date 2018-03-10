const express = require('express');
const operationController = require('../controllers/index');
const passport = require('../services/passport');
const modelUser = require('../models/users');

const router = express.Router();
function setRouter() {
  const loginController = operationController.setControllerOperation(modelUser, { formName: 'Login' });
  router.get('/form', loginController.logout);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

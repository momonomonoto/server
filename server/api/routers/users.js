const express = require('express');
const operationController = require('../../controllers/index');
const modelUser= require('../../models/users');

const router = express.Router();

function setRouter() {
  const userController = operationController.setControllerOperation(modelUser,{ apiRequest: true });
  router.post('/', userController.showUsers);
  return router;
}

const resultRouter = setRouter();
module.exports = resultRouter;

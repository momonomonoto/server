const express = require('express');
const operationController = require('../../controllers/index');

const router = express.Router();

function setRouter() {
  const tokenController = operationController.setControllerOperation({ apiRequest: true });
  router.post('/', tokenController.getToken);
  return router;
}

const resultRouter = setRouter();
module.exports = resultRouter;

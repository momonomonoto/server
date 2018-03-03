const express = require('express');
const operationController = require('../../controllers/index');

const router = express.Router();

function setRouter() {
  const projectController = operationController.setControllerOperation({ apiRequest: true });
  router.post('/', projectController.showProjects);
  return router;
}

const resultRouter = setRouter();
module.exports = resultRouter;

const express = require('express');
const operationController = require('../../controllers/index');
const modelProjects = require('../../models/project');

const router = express.Router();

function setRouter() {
  const projectController = operationController.setControllerOperation(modelProjects, { apiRequest: true });
  router.post('/', projectController.showProjects);
  return router;
}

const resultRouter = setRouter();
module.exports = resultRouter;

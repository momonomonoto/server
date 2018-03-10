const express = require('express');
const operationController = require('../controllers/index');
const modelProjects = require('../models/project');

const router = express.Router();

function setRouter() {
  const categoryController = operationController.setControllerOperation(modelProjects);
  router.get('/:categoryParam', categoryController.searchCategory);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

const express = require('express');
const operationController = require('../controllers/operationController');
const items = require('../data/about');

const router = express.Router();

function setRouter(items) {
  const itemController = operationController.setControllerOperation();
  router.get('/', itemController.showAboutInformation);
  return router;
}
const resultRouter = setRouter(items);
module.exports = resultRouter;

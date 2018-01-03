const express = require('express');
const operationController = require('../controllers/operationController');
const items = require('../data/items');

const router = express.Router();

function setRouter(items) {
  const itemController = operationController.setControllerOperation(items);
  router.get('/:categoryParam', itemController.searchCategory);
  return router;
}
const resultRouter = setRouter(items);
module.exports = resultRouter;

const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const itemController = operationController.setControllerOperation();
  router.get('/:categoryParam', itemController.searchCategory);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

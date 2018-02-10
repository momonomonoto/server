const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const categoryController = operationController.setControllerOperation();
  router.get('/:categoryParam', categoryController.searchCategory);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

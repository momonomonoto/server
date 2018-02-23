const express = require('express');
const operationController = require('../controllers/index');

const router = express.Router();

function setRouter() {
  const aboutController = operationController.setControllerOperation();
  router.get('/info', aboutController.showAboutInformation);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

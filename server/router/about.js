const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const aboutController = operationController.setControllerOperation();
  router.get('/', aboutController.showAboutInformation);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

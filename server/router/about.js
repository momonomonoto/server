const express = require('express');
const operationController = require('../controllers/index');
const modelAbout = require('../models/about');

const router = express.Router();

function setRouter() {
  const aboutController = operationController.setControllerOperation(modelAbout);
  router.get('/info', aboutController.showAboutInformation);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

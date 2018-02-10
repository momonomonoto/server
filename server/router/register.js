const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const itemController = operationController.setControllerOperation({formName: 'Register'});
  router.get('/', itemController.showForm);
  router.post('/', itemController.register);
  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

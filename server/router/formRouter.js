const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const itemController = operationController.setControllerOperation();

  router.get('/', (req, res) => {
    res.render('form/index', { formRestore: true, formName: 'Login' });
  });
  router.post('/', itemController.authorization);

  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

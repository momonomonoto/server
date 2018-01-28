const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  const itemController = operationController.setControllerOperation();

  router.get('/', (req, res) => {
    res.render('form/index', { formRestore: true, formName: 'Register' });
  });
  router.post('/', itemController.register);

  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

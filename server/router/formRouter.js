const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
  router.get('/', (req, res) => {
    res.render('form/index', { formRestore: true });
  });

  return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

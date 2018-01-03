const express = require('express');
const operationController = require('../controllers/operationController');
const items = require('../data/about');

const router = express.Router();

function setRouter(items) {
  const itemController = operationController.setControllerOperation(items,'about');
  router.get('/', (req, res)=> {
    res.render('about/index', { cargo: items });

  });

  return router;
}
const resultRouter = setRouter(items);
module.exports = resultRouter;

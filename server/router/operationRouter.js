const express = require('express');
const operationController = require('../controllers/operationController');
const router = express.Router();

function setRouter(items) {
  const itemController = operationController.setControllerOperation(items);
  router.get('/', itemController.showItems);
  router.get('/delete', itemController.deleteItems);
  router.get('/edit', itemController.editItem);
  router.get('/add', itemController.addItem);
  router.get('/category/:categoryParam', itemController.searchCategory);
  router.get('/select/:idList', itemController.selectItem);
  router.get('/:id', itemController.showItem);
  router.get('/commentary/:id', itemController.showCommentary);
  router.get('/commentary/delete/:id/:commentaryId', itemController.deleteCommentary);
  router.get('/commentary/create/:id/:commentaryContext', itemController.createCommentary);
  router.get('/commentary/edit/:id/:commentaryId/:commentaryContext', itemController.editCommentary);
  router.post('/', itemController.searchItem);
  return router;
}

module.exports = {
  getRouter(items) {
    return setRouter(items);
  }
};
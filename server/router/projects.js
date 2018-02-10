const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
    const itemController = operationController.setControllerOperation();
    router.get('/', itemController.showItems);
    router.get('/search', itemController.searchItem);
    router.get('/category/:categoryParam', itemController.searchCategory);
    router.get('/:id', itemController.showItem);
    router.get('/add_commentary/:id', itemController.showCommentaryForm);
    router.post('/add_commentary/:id', itemController.createCommentary);
    router.get('/commentary/create/:id/:commentaryContext', itemController.createCommentary);
    return router;
}

const resultRouter = setRouter();
module.exports = resultRouter;

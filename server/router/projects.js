const express = require('express');
const operationController = require('../controllers/operationController');

const router = express.Router();

function setRouter() {
    const itemController = operationController.setControllerOperation();
    router.get('/', itemController.showProjects);
    router.get('/search', itemController.searchProjects);
    router.get('/:id', itemController.showProject);
    router.get('/add_commentary/:id', itemController.showCommentaryForm);
    router.post('/add_commentary/:id', itemController.createCommentary);
    return router;
}

const resultRouter = setRouter();
module.exports = resultRouter;

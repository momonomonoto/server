const express = require('express');
const operationController = require('../controllers/index');

const router = express.Router();

function setRouter() {
    const projectController = operationController.setControllerOperation();
    router.get('/', projectController.showProjects);
    router.get('/search', projectController.searchProjects);
    router.get('/project/:id', projectController.showProject);
    router.get('/add_commentary/:id', projectController.showCommentaryForm);
    router.post('/add_commentary/:id', projectController.createCommentary);
    return router;
}

const resultRouter = setRouter();
module.exports = resultRouter;

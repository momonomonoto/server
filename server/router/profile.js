const { Router } = require('express');
const operationController = require('../controllers/index');

const router = Router();

function setRouter() {
    const profileController = operationController.setControllerOperation();
    router.get('/user', profileController.showProfile);
    return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

const { Router } = require('express');
const operationController = require('../controllers/operationController');

const router = Router();

function setRouter() {
    const mainController = operationController.setControllerOperation();
    router.get('/', mainController.showMainPage);
    return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

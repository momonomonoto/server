const { Router } = require('express');
const operationController = require('../controllers/operationController');

const router = Router();

function setRouter() {
    const itemController = operationController.setControllerOperation();
    router.get('/', itemController.showProfile);
    return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

const { Router } = require('express');
const operationController = require('../controllers/index');
const modelUser = require('../models/users');

const router = Router();

function setRouter() {
    const profileController = operationController.setControllerOperation(modelUser);
    router.get('/user', profileController.showProfile);
    return router;
}
const resultRouter = setRouter();
module.exports = resultRouter;

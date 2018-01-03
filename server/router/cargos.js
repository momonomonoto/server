const items = require('../data/items');
const operationRouter = require('../router/operationRouter');

const router = operationRouter.getRouter(items);

module.exports = router;

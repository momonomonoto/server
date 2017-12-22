const express = require('express');

const itemController = require('../controllers/items');

const router = express.Router();

router.get('/', itemController.showItems);

router.get('/:id', itemController.showItem);

module.exports = router;
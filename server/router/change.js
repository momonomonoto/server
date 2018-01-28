const express = require('express');

const itemController = require('../controllers/change');

const router = express.Router();

router.get('/delete', itemController.deleteItems);

router.get('/edit', itemController.editItem);

module.exports = router;

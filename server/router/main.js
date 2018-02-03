const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('main/index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;

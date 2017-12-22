const express = require('express');
const itemRouter = require('./router/items');
const changeRouter = require('./router/change');
const mainRouter = require('./router/main');

const server = express();

server.use('/', mainRouter);
server.use('/items', itemRouter);
server.use('/change', changeRouter);
server.listen(3000, () => console.log('Express', 3000));

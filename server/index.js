const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cargoRouter = require('./router/cargos');
const mainRouter = require('./router/main');
const aboutRouter = require('./router/aboutRouter');
const formRouter = require('./router/formRouter');
const profileRouter = require('./router/profileRouter');
const categoryRouter = require('./router/category');
const registerRouter = require('./router/registerRouter');
const config = require('./config');

const server = express();

server.use(express.static(config.path.static));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('views', config.path.view);
server.set('view engine', 'pug');
server.get('/', mainRouter);
server.use('/cargos', cargoRouter);
server.use('/category', categoryRouter);
server.use('/about', aboutRouter);
server.use('/login', formRouter);
server.use('/register', registerRouter);
server.use('/profile', profileRouter);

server.listen(3000, () => console.log('Express', 3000));

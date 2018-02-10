const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const projects = require('./router/projects');
const main = require('./router/main');
const about = require('./router/about');
const login = require('./router/login');
const profile = require('./router/profile');
const categoryRouter = require('./router/category');
const register = require('./router/register');
const config = require('./config');

const server = express();

server.use(express.static(config.path.static));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('views', config.path.view);
server.set('view engine', 'pug');
server.get('/', main);
server.use('/projects', projects);
server.use('/category', categoryRouter);
server.use('/about', about);
server.use('/login', login);
server.use('/register', register);
server.use('/profile', profile);

server.listen(3000, () => console.log('Express', 3000));

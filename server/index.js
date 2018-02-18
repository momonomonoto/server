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
const session = require('express-session');
const server = express();
const db = require('./services/db.js');
const MongoStore = require('connect-mongo')(session);
const auth  = require('./middlewares/auth');

server.use(express.static(config.path.static));

// server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('views', config.path.view);
server.set('view engine', 'pug');
server.use(session({
    name: 'sessionId',
    resave: false,
    secret: config.sessionSecret,
    saveUninitialized: true,
    cookie: {},
    store: new MongoStore({
        mongooseConnection: db.connection,
        url: config.mongodbUri.mlab,
        ttl: 60 * 60 * 24 * 3, // 3 days
        touchAfter: 60 * 60 * 24 // 1 day
    })
}));
server.use(auth.findUser);

server.get('/', main);
server.use('/projects', projects);
server.use('/category', categoryRouter);
server.use('/about', about);
server.use('/login', login);
server.use('/register', register);

server.use('/profile', profile);

server.listen(3000, () => console.log('Express', 3000));


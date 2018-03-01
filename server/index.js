const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./services/passport');
const projects = require('./router/projects');
const about = require('./router/about');
const login = require('./router/login');
const logout = require('./router/logout');
const profile = require('./router/profile');
const api = require('./api');
const projectRouter = require('./router/profile');
const categoryRouter = require('./router/category');
const register = require('./router/register');
const config = require('./config');
const session = require('express-session');

const server = express();
const db = require('./services/db.js');
const MongoStore = require('connect-mongo')(session);

server.use(express.static(config.path.view));
// server.use(cookieParser());
// server.use(bodyParser.urlencoded({ extended: false }));
server.set('views', config.path.view);
server.set('view engine', 'pug');
server.use(session({
  name: 'sessionId',
  resave: false,
  secret: config.sessionSecret,
  saveUninitialized: false,
  cookie: {},
  store: new MongoStore({
    mongooseConnection: db.connection,
    url: config.mongodbUri.local,
    ttl: 60 * 60 * 24 * 3, // 3 days
    touchAfter: 60 * 60 * 24 // 1 day
  })
}));
server.use(passport.initialize());
server.use(passport.session());

server.use('/', projects);
server.use('/category', categoryRouter);
server.use('/about', about);
server.use('/login', login);
server.use('/register', register);
server.use('/logout', logout);

server.use('/profile', profile);
server.use('/api', api);

server.listen(3000, () => console.log('Express', 3000));


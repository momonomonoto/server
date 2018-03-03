const express = require('express');
const passport = require('../services/jwt');
const projectsRouter = require('./routers/projects');
const usersRouter = require('./routers/users');
const tokenRouter = require('./routers/auth');
const bodyParser = require('body-parser');

const api = express();
api.use(bodyParser.urlencoded({ extended: false }));
api.use('/token', tokenRouter);
api.use(passport.authenticate('jwt', { session: false }));
api.use('/projects', projectsRouter);
api.use('/users', usersRouter);

module.exports = api;

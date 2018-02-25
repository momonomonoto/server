const resultRouter = require('./routers/projects');
const express = require('express');

const api = express();

api.use('/projects', resultRouter);

module.exports = api;

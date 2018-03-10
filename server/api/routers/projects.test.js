const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const authRouter = require('./auth');
const projectRouter = require('./projects');
const bodyParser = require('body-parser');
const config = require('../../config');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/token', authRouter);
app.use('/projects', projectRouter);

const agent = request.agent(app);

describe('Test api project', () => {
  beforeAll(() => {
    return mongoose.connect(config.mongodbUri.mlab);
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  test('Get projects. If token is valid', () => {
    return agent.post('/projects')
            .expect(200);
  });
});

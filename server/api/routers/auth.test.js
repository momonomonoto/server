const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../../models/users');
const authRouter = require('./auth');
const bodyParser = require('body-parser');
const config = require('../../config');

const app = express();
const agent = request.agent(app);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/token', authRouter);


describe('Test auth api', () => {
  beforeAll(() => {
    return mongoose.connect(config.mongodbUri.mlab);
  });
  beforeAll(() => {
    return User.create({ name: '6666', password: '6666' });
  });
  afterAll(() => {
    return User.deleteMany({});
  });

  afterAll(() => {
    return mongoose.disconnect();
  });
  test('Get api token. If name and password are valid', () => {
    return agent.post('/token')
            .send({ name: '6666', password: '6666' })
            .expect(200);
  });
});

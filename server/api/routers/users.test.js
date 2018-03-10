const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const authRouter = require('./auth');
const userRouter = require('./users');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/token', authRouter);
app.use('/users', userRouter);

const agent = request.agent(app);

describe('Test api user ', () => {
  let token;
  beforeAll(() => {
    return mongoose.connect('mongodb://user:user@ds239648.mlab.com:39648/tes');
  });
  beforeEach(() => {
    return agent.post('/token')
            .send({ name: '123', password: '123' })
            .expect(200);
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  test('Get users. If token is valid', () => {
    return agent.post('/users')
            .expect(200);
  });
});

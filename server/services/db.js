const { MongoClient, ObjectID } = require('mongodb');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));
//
// const db = {
//   connect() {
//     return connect.then(client => client.db('shop').collection('projects'));
//   },
//
//   close() {
//     return connect.then(client => client.close());
//   },
//
//   ObjectID
// };
const db = mongoose.connect('mongodb://localhost:27017/shop');
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

module.exports = db;

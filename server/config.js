const path = require('path');

module.exports = {
    sessionSecret: 'HacJmB3ma6crKKtK',
    path: {
    view: path.resolve(__dirname, 'views'),
    static: path.resolve(__dirname, 'public')
  },
  mongodbUri: {
      local: 'mongodb://localhost:27017/shop',
  },
};

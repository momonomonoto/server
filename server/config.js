const path = require('path');

module.exports = {
  sessionSecret: 'HacJmB3ma6crKKtK',
  path: {
    view: path.resolve(__dirname, 'views'),
    static: path.resolve(__dirname, 'public')
  },
  mongodbUri: {
    local: 'mongodb://localhost:27017/shop',
    mlab: 'mongodb://user:user@ds239648.mlab.com:39648/tes'
  }
};

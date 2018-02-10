const path = require('path');

module.exports = {
  path: {
    view: path.resolve(__dirname, 'views'),
    static: path.resolve(__dirname, 'public')
  },
  mongodbUri: {
      local: 'mongodb://localhost:27017/shop',
  },
};

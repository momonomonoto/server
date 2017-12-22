const items = require('../data/items');

module.exports = {
  showItems(req, res) {
    res.send(items);
  },

  showItem(req, res) {
    const item = items.find(item => item.id == req.params.id);
    res.send(item);
  }
};

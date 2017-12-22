const items = require('../data/items');

module.exports = {
  deleteItems(req, res) {
    const queryItemId = Number(Object.keys(req.query)[0]);
    const itemsList = items.filter(item => {
      return item.id !== queryItemId;
    });
    res.send(itemsList);
  },

  editItem(req, res) {
    const queryItemId = Number(Object.keys(req.query)[0]);
    const queryItemContext = Object.getOwnPropertyDescriptor(req.query, queryItemId).value;
    const itemList = items.map((item,index,arr) => {
      if (item.id === queryItemId) {
        item.title = queryItemContext;
      }
      return item;
    });
    res.send(itemList);
  }
};

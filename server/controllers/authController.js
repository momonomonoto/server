const shortId = require('shortId');

function getItemsByOperation(items) {
  return {
    deleteItems(req, res) {
      const queryItemId = Number(Object.keys(req.query)[0]);
      const itemsList = items.filter(item => {
        return item.id !== queryItemId;
      });
      res.send(itemsList);
    },
    deleteCommentary (req, res) {
      const queryItemId = Number(Object.keys(req.query)[0]);
      const itemsList = items.filter(item => {
        return item.id !== queryItemId;
      });
    },
    editItem(req, res) {
      const queryItemId = Number(Object.keys(req.query)[0]);
      const queryItemContext = Object.getOwnPropertyDescriptor(req.query, queryItemId).value;
      const itemList = items.map((item, index, arr) => {
        if (item.id === queryItemId) {
          item.title = queryItemContext;
        }
        return item;
      });
      res.send(itemList);
    },
    addItem(req, res) {
      const titleItems = Object.getOwnPropertyNames(req.query).join();
      const id = shortId.generate();
      const itemList = items.concat([{ id, title: titleItems }]);
      res.send(itemList);
    },
    showItems(req, res) {
      res.send(items);
    },
    showItem(req, res) {
      const item = items.find(item => item.id == req.params.id);
      res.send(item);
    }
  };
}

module.exports = {
  setControllerOperation(items) {
    const operationCargos = { ...getItemsByOperation(items) };
    const operationCommentaries = { ...getItemsByOperation(items) };
    return {
      ...operationCargos
    };
  }
};

const shortId = require('shortId');

module.exports = {
  setControllerOperation(items, param) {
    const findElemByParam = (items, nameParam, valueParam) => {
      const resultList = items.filter(elemItem => {
        const elemValueParam = elemItem[`${nameParam}`].toLowerCase();
        const findValueParam = valueParam.toString().toLowerCase();
        return elemValueParam.includes(findValueParam);
      });
      return resultList;
    };
    const findItemById = (items, findId) => {
      const itemId = Number(findId);
      const itemResult = items.find(elemItem => elemItem.id === itemId);
      return itemResult;
    };
    const createItemCommentary = (items, newItem) => {
      const itemList = items.map(elemItem => {
        if (elemItem.id === newItem.id) return newItem;
        return elemItem;
      });
      return itemList;
    };

    const changeCommentary = (item, commentaryId, param = 'delete', commentaryContext = '') => {
      const { commentaries } = item;

      const objParam = {
        delete() {
          const resultCommentaries = commentaries.filter(elemCommentary => elemCommentary.id !== Number(commentaryId));
          return resultCommentaries;
        },
        edit() {
          const resultCommentaries = commentaries.map(elemCommentary => {
            if (elemCommentary.id === Number(commentaryId)) elemCommentary.title = commentaryContext;
            return elemCommentary;
          });
          return resultCommentaries;
        }
      };


      if (objParam.hasOwnProperty(param)) {
        const resultCommentaries = objParam[param]();
        const newItem = Object.assign({}, item, { commentaries: resultCommentaries });
        const itemList = createItemCommentary(items, newItem);
        return itemList;
      }
      return items;
    };


    const createCommentary = (items, idItem, commentaryContext) => {
      const item = findItemById(items, idItem);
      const { commentaries } = item;
      const newCommentaries = commentaries.concat({ id: shortId.generate(), title: commentaryContext });
      const newItem = Object.assign({}, item, { commentaries: newCommentaries });
      const resultList = createItemCommentary(items, newItem);
      return resultList;
    };

    return {
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
      searchItem(req, res) {
        const search = req.body.search;
        const resultList = findElemByParam(items, 'title', search);
        res.render('cargos/index', { cargos: resultList });
      },
      searchCategory(req, res) {
        const { categoryParam } = req.params;
        const resultList = findElemByParam(items, 'category', categoryParam);
        res.render('cargos/index', { cargos: resultList });
      },
      showItems(req, res) {
        res.render('cargos/index', { cargos: items });
      },
      showItem(req, res) {
        const { id } = req.params;
        const item = findItemById(items, id);
        res.render('cargo/index', { cargo: item });
      },
      selectItem(req, res) {
        const { idList } = req.params;
        const selectArrIdList = (items, idList) => {
          const resultList = items.map((elemList, index) => {
            const { select } = elemList;
            const newSelect = !select;
            if (idList.includes(elemList)) {
              const newElemList = Object.assign({}, elemList, { select: newSelect });
              return newElemList;
            }
            return elemList;
          });
          return resultList;
        };

        const trasformIdListToArray = (idList) => {
          const idListArray = idList.match(/,/g);
          if (idListArray) {
            const resultIdList = idList.split();
            return resultIdList;
          }
          return idList;
        };

        const selectStringId = (arrId) => {
          const arrList = arrId.map(elemItem => {
            const { select } = elemItem;
            const newSelect = !select;
            if (elemItem.id === Number(idList)) {
              const resultElem = Object.assign({}, elemItem, { select: true });
              return resultElem;
            }
            return elemItem;
          });
          return arrList;
        };

        const elemId = trasformIdListToArray(idList);
        if (Array.isArray(elemId)) {
          const resultList = selectArrIdList(items, elemId);
          res.send(resultList);
        } else {
          const resultList = selectStringId(items, elemId);
          res.send(resultList);
        }
      },
      showCommentary(req, res) {
        const { id } = req.params;
        const item = findItemById(items, id);
        res.send(item.commentaries);
      },
      deleteCommentary(req, res) {
        const { id, commentaryId } = req.params;
        const item = findItemById(items, id);
        const itemList = changeCommentary(item, commentaryId);
        res.send(itemList);
      },
      createCommentary(req, res) {
        const { id, commentaryContext } = req.params;
        const resultList = createCommentary(items, id, commentaryContext);
        res.send(resultList);
      },
      editCommentary(req, res) {
        const { id, commentaryId, commentaryContext } = req.params;
        const item = findItemById(items, id);
        const resultList = changeCommentary(item, commentaryId, 'edit', commentaryContext);
        res.send(resultList);
      }
    };
  }
};

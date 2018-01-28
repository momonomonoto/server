const shortId = require('shortid');
const { db, ObjectID } = require('../services/db');
const { ObjectId } = require('mongodb'); // or ObjectID
const modelMongo = require('../models/project');
const modelCommentary = require('../models/commentary');
const modelUser = require('../models/users');

const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;

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


    const createCommentary = (items, idItem, commentaryContext, newTitle) => {
      const item = findItemById(items, idItem);
      const { commentaries } = item;
      const newCommentaries = commentaries.concat({ id: shortId.generate(), title: newTitle, description: commentaryContext });
      const newItem = Object.assign({}, item, { commentaries: newCommentaries });
      // const resultList = createItemCommentary(items, newItem);
      return newItem;
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
        modelMongo.find({ title: search }).then((cargos) => {
          res.render('cargos/index', { cargos });
        });
      },
      searchCategory(req, res, next) {
        const { categoryParam } = req.params;
        modelMongo.find({ category: categoryParam })
              .then(resultList => {
                res.render('cargos/index', { cargos: resultList });
              })
            .catch(next);
      },
      showItems(req, res, next) {
        modelMongo.find().then((cargos) => {
          res.render('cargos/index', { cargos });
        });
      },
      showItem(req, res, next) {
        const { id } = req.params;
        modelMongo.findOne({ id })
              .then(item => {
                res.render('cargo/index', { cargo: item });
              })
              .catch(next);
      },
      selectItem(req, res) {
        const { idList } = req.params;
        // const selectArrIdList = (items, idList) => {
        //   const resultList = items.map((elemList, index) => {
        //     const { select } = elemList;
        //     const newSelect = !select;
        //     if (idList.includes(elemList)) {
        //       const newElemList = Object.assign({}, elemList, { select: newSelect });
        //       return newElemList;
        //     }
        //     return elemList;
        //   });
        //   return resultList;
        // };
        //
        // const trasformIdListToArray = (idList) => {
        //   const idListArray = idList.match(/,/g);
        //   if (idListArray) {
        //     const resultIdList = idList.split();
        //     return resultIdList;
        //   }
        //   return idList;
        // };
        //
        // const selectStringId = (arrId) => {
        //   const arrList = arrId.map(elemItem => {
        //     const { select } = elemItem;
        //     const newSelect = !select;
        //     if (elemItem.id === Number(idList)) {
        //       const resultElem = Object.assign({}, elemItem, { select: true });
        //       return resultElem;
        //     }
        //     return elemItem;
        //   });
        //   return arrList;
        // };
        //
        // const elemId = trasformIdListToArray(idList);
        // if (Array.isArray(elemId)) {
        //   const resultList = selectArrIdList(items, elemId);
        //   res.send(resultList);
        // } else {
        //   const resultList = selectStringId(items, elemId);
        //   res.send(resultList);
        // }
      },
      showCommentaryForm(req, res) {
        res.render('commentaryForm/index');
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
        const { title, text } = req.body;
        const { id, _id } = req.params;
        console.log(req.params, 'req.params');
        // const resultElem = createCommentary(items, id, text, title);
        // modelMongo.findByIdAndUpdate(id, { $set: { size: 'large' } }, { new: true }, (err, resultElem) => {
        //   if (err) return err;
        //   res.render('cargo/index', { cargo: resultElem });
        // });
        // modelMongo.findOne({ id }, (err, elem) => {
        //   console.log(elem,'elemelem')
        //   elem.set({ commentaries: [] });
        //   elem.save((err, newElem) => {
        //     if (err) return;
        //     res.render('cargo/index', { cargo: elem });
        //   });
        // });
        const query = { id };
        modelMongo.findOneAndUpdate(query, { commentaries: { title, text } }, (err, elem) => {
          return res.render('cargo/index', { cargo: elem });
        });

        //   modelMongo.findOne({ id }, (err, elem) => {
        //       // elem.commentaries = elem.commentaries.push({ title, text });
        //     elem.save({ commentaries: elem.commentaries.push({ title, text }) });
        //     modelMongo.update(elem)
        //   res.render('cargo/index', { cargo: elem });
        // });
      },
      editCommentary(req, res) {
        const { id, commentaryId, commentaryContext } = req.params;
        const item = findItemById(items, id);
        const resultList = changeCommentary(item, commentaryId, 'edit', commentaryContext);
        res.send(resultList);
      },
      authorization(req, res, next) {
        const { password, name } = req.body;
        modelUser.findOne({ name, password })
              .then(user => {
                console.log(user, 'This is user');
                res.cookie('userId', user.id);
                res.redirect('/profile/');
              })
            .catch(() => {
              res.redirect('/cargos/');
            }
            );
      },
      register(req, res, next) {
        const { password, name } = req.body;
        res.redirect('/cargos/');
        modelUser.create({ name, password })
              .then(user => {
                res.session.userId = user.id;
                  res.cookie('userId', user.id);
                  res.redirect('/profile/');
              })
              .catch(() => {
                res.redirect('/cargos/');
              }
              );
      }
    };
  }
};

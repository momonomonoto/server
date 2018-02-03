const shortId = require('shortid');
const { db, ObjectID } = require('../services/db');
const { ObjectId } = require('mongodb'); // or ObjectID
const modelMongo = require('../models/project');
const modelCommentary = require('../models/commentary');
const modelUser = require('../models/users');

const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;

module.exports = {
  setControllerOperation(items, param) {
    return {
      deleteItems(req, res) {
        const queryItemId = Number(Object.keys(req.query)[0]);
      },

      editItem(req, res) {
        const queryItemId = Number(Object.keys(req.query)[0]);
        const queryItemContext = Object.getOwnPropertyDescriptor(req.query, queryItemId).value;
      },
      addItem(req, res) {
        const titleItems = Object.getOwnPropertyNames(req.query).join();
        const id = shortId.generate();
      },
      searchItem(req, res) {
        const search = new RegExp(req.query.search, 'gi');
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
      },
      deleteCommentary(req, res) {
        const { id, commentaryId } = req.params;
      },
      createCommentary(req, res) {
        const { title, text } = req.body;
        const { id, _id } = req.params;
        const description = text;
        // const resultElem = createCommentary(items, id, text, title);
        // modelMongo.findByIdAndUpdate(id, { $set: { size: 'large' } }, { new: true }, (err, resultElem) => {
        //   if (err) return err;
        //   res.render('cargo/index', { cargo: resultElem });
        // });
        console.log(id, 'idid');
        modelMongo.findOne({ id }, (err, elem) => {
          elem.commentaries.push({ title, description });

          elem.save((err, elem) => {
            console.log(elem, 'new elem');
            console.log(err, 'err');
             // if (err) return;
            res.redirect('/cargos/');
          });
        });
        // const query = { id };
        //
        // modelMongo.findOneAndUpdate(query, { commentaries: { title, text } }, (err, elem) => {
        //   return res.render('cargo/index', { cargo: elem });
        // });

        //   modelMongo.findOne({ id }, (err, elem) => {
        //       // elem.commentaries = elem.commentaries.push({ title, text });
        //     elem.save({ commentaries: elem.commentaries.push({ title, text }) });
        //     modelMongo.update(elem)
        //   res.render('cargo/index', { cargo: elem });
        // });
      },
      editCommentary(req, res) {
        const { id, commentaryId, commentaryContext } = req.params;
      },
      authorization(req, res, next) {
        const { password, name } = req.body;
        modelUser.findOne({ name, password })
              .then(user => {
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

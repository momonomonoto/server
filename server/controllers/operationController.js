const shortId = require('shortid');
const { db, ObjectID } = require('../services/db');
const { ObjectId } = require('mongodb'); // or ObjectID
const modelMongo = require('../models/project');
const modelCommentary = require('../models/commentary');
const modelUser = require('../models/users');
const modelAbout = require('../models/about');

const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null;

module.exports = {
  setControllerOperation(param) {
    return {
      showMainPage(req, res) {
        res.render('main/index', { title: 'Hey', message: 'Hello there!' });
      },
      showAboutInformation(req, res) {
        modelAbout.find().then((aboutItem) => {
          res.render('about/index', { project: aboutItem[0] });
        });
      },
      showAuthForm(req, res) {
        const { formName } = param;
        res.render('authorization/index', { formRestore: true, formName });
      },
      showProfile(req, res, next) {
        if (Boolean(req.session.passport) === false) {
          return res.render('profile/index', { name: 'not autorized user', email: '' });
        }
        const { session: { passport: { user } } } = req;
        modelUser.findById(user)
              .then(user => {
                res.render('profile/index', { name: user.name, email: user.email });
              })
              .catch(next);
      },
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
      searchProjects(req, res) {
        const search = new RegExp(req.query.search, 'gi');
        modelMongo.find({ title: search }).then((projects) => {
          res.render('projects/index', { projects });
        });
      },
      searchCategory(req, res, next) {
        const { categoryParam } = req.params;
        modelMongo.find({ category: categoryParam })
          .then(resultList => {
            res.render('projects/index', { projects: resultList });
          })
          .catch(next);
      },
      showProjects(req, res, next) {
        modelMongo.find().then((projects) => {
          res.render('projects/index', { projects });
        });
      },
      showProject(req, res, next) {
        const { id } = req.params;
        modelMongo.findOne({ id })
          .then(item => {
            res.render('project/index', { project: item });
          })
          .catch(next);
      },
      selectItem(req, res) {
        const { idList } = req.params;
      },
      showCommentaryForm(req, res) {
        res.render('addCommentary/index');
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
        modelMongo.findOne({ id }, (err, elem) => {
          elem.commentaries.push({ title, description });
          elem.save((err, elem) => {
             // if (err) return;
            res.redirect('/');
          });
        });
      },
      editCommentary(req, res) {
        const { id, commentaryId, commentaryContext } = req.params;
      },
      authorization(req, res) {
        const { password, name } = req.body;
        modelUser.findOne({ name, password })
          .then(user => {
            req.session.userId = user.id;
            res.redirect('/profile/user');
          })
          .catch(() => {
            res.redirect('/');
          });
      },
      logout(req, res) {
        req.session.destroy();
        res.redirect('/profile/user');
      },
      register(req, res) {
        const { password, name } = req.body;
        modelUser.create({ name, password })
          .then(user => {
            req.session.userId = user._id;
            res.redirect('/profile/user');
          })
          .catch(() => {
            res.redirect('/');
          });
      }
    };
  }
};

const modelProjects = require('../models/project');

module.exports = {
  showProjects(req, res, next) {
    modelProjects.find().then((projects) => {
      res.render('projects/index', { projects });
    });
  },
  showProject(req, res, next) {
    const { id } = req.params;
    modelProjects.findOne({ id })
      .then(item => {
        res.render('project/index', { project: item });
      })
      .catch(next);
  },
  searchProjects(req, res) {
    const search = new RegExp(req.query.search, 'gi');
    modelProjects.find({ title: search }).then((projects) => {
      res.render('projects/index', { projects });
    });
  },
  searchCategory(req, res, next) {
    const { categoryParam } = req.params;
    modelProjects.find({ category: categoryParam })
      .then(resultList => {
        res.render('projects/index', { projects: resultList });
      })
      .catch(next);
  }
};

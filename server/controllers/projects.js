
module.exports = Projects => ({
  showProjects: (param) => (req, res, next) => {
    const { apiRequest } = param || false;
    return Projects.find().then((projects) => {
      if (apiRequest) {
        res.json(projects);
        res.sendStatus(200);
      }
      res.render('projects/index', { projects });
    })
    .catch(err => res.status(500));
  },
  showProject(req, res, next) {
    const { id } = req.params;
    return Projects.findOne({ id })
      .then(item => {
        res.render('project/index', { project: item });
      })
      .catch(next);
  },
  searchProjects(req, res) {
    const search = new RegExp(req.query.search, 'gi');
    return Projects.find({ title: search }).then((projects) => {
      res.render('projects/index', { projects });
    });
  },
  searchCategory(req, res, next) {
    const { categoryParam } = req.params;
    return Projects.find({ category: categoryParam })
      .then(resultList => {
        res.render('projects/index', { projects: resultList });
      })
      .catch(next);
  }
});

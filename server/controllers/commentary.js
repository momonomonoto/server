const modelProjects = require('../models/project');

module.exports = {
  showCommentaryForm(req, res) {
    res.render('addCommentary/index');
  },
  createCommentary(req, res) {
    const { title, text } = req.body;
    const { id } = req.params;
    const description = text;
      modelProjects.findOne({ id }, (err, elem) => {
        if (Boolean(id) === false) throw new Error('Id is not valid');
        const commentaries = [].concat(elem.commentaries,[{title,description}]);
        modelProjects.update({id}, {commentaries}, () => {res.redirect(`/${id}`);})
      });

  }
};


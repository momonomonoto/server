const modelProjects = require('../models/about');

module.exports = {
  showCommentaryForm(req, res) {
    res.render('addCommentary/index');
  },
  createCommentary(req, res) {
    const { title, text } = req.body;
    const { id, _id } = req.params;
    const description = text;
    modelProjects.findOne({ id }, (err, elem) => {
      elem.commentaries.push({ title, description });
      elem.save((err, elem) => {
        res.redirect('/');
      });
    });
  }
};

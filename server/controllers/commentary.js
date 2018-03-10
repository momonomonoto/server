
module.exports = Project => ({
  showCommentaryForm(req, res) {
    res.render('addCommentary/index');
  },
  createCommentary(req, res) {
    const { title, text } = req.body;
    const { id } = req.params;
    const author = req.user.name;
    const description = text;
    Project.findOne({ id }, (err, elem) => {
      if (Boolean(id) === false) throw new Error('Id is not valid');
      const commentaries = [].concat(elem.commentaries, [{ title, description, author }]);
      return Project.update({ id }, { commentaries }, () => { res.redirect(`/project/${id}`); });
    });
  }
});


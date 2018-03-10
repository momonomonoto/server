
module.exports = aboutInformation => ({
  showAboutInformation(req, res) {
    return aboutInformation.find().then((aboutItem) => {
      res.sendStatus(200);
      res.render('about/index', { project: aboutItem[0] });
    });
  }
});

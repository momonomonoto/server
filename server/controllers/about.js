const modelAbout = require('../models/about');

module.exports = {
  showAboutInformation(req, res) {
    modelAbout.find().then((aboutItem) => {
      res.render('about/index', { project: aboutItem[0] });
    });
  }
};

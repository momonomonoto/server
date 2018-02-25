const { showProjects, showProject, searchProjects, searchCategory } = require('./projects');
const { showAboutInformation } = require('./about');
const { showProfile } = require('./profile');
const { showCommentaryForm, createCommentary } = require('./commentary');
const { showAuthForm, register, authorization, logout } = require('./auth');

module.exports = {
  setControllerOperation(param) {
    return {
      showProjects: showProjects(param),
      showProject,
      searchCategory,
      searchProjects,
      showAboutInformation,
      showProfile,
      showAuthForm: showAuthForm(param),
      register,
      authorization,
      logout,
      showCommentaryForm,
      createCommentary
    };
  }
};

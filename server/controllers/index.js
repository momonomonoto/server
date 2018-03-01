const { showProjects, showProject, searchProjects, searchCategory } = require('./projects');
const { showAboutInformation } = require('./about');
const { showProfile } = require('./profile');
const { showCommentaryForm, createCommentary } = require('./commentary');
const { showAuthForm, register, authorization, logout, getToken } = require('./auth');
const { showUsers } = require('./users');

module.exports = {
  setControllerOperation(param) {
    return {
      showProjects: showProjects(param),
      getToken,
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
      createCommentary,
      showUsers: showUsers(param)
    };
  }
};

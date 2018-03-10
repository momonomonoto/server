

module.exports = {
  setControllerOperation(model, param) {
    // if (!model) throw new Error('Model for controller is not defined');
    const { showProjects, showProject, searchProjects, searchCategory } = require('./projects')(model);
    const { showAboutInformation } = require('./about')(model);
    const { showProfile } = require('./profile')(model);
    const { showCommentaryForm, createCommentary } = require('./commentary')(model);
    const { showAuthForm, register, authorization, logout, getToken } = require('./auth')(model);
    const { showUsers } = require('./users')(model);

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

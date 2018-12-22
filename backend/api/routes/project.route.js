module.exports = function (app) {
    
    const projectController = require('../controllers/project.controller');

    app.route('/projects')
        .get(projectController.list_projects)
    app.route('/project')
        .post(projectController.save_project)

    app.route('/project/:id')
        .get(projectController.get_project)
        .put(projectController.update_project)
        .delete(projectController.delete_project)

}
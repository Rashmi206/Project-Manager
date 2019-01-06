module.exports = function (app) {

    const projectController = require('../controllers/project.controller');

    app.route('/api/projects')
        .get(projectController.list_projects)
    app.route('/api/project')
        .post(projectController.save_project)

    app.route('/api/project/:id')
        .get(projectController.get_project)
        .put(projectController.update_project)
        .delete(projectController.delete_project)

    app.route('/api/project-tasks')
        .get(projectController.list_project_tasks)

}
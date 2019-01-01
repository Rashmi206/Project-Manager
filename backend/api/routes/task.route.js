module.exports = function (app) {

    const taskController = require('../controllers/task.controller');

    app.route('/tasks')
        .get(taskController.list_tasks)
    app.route('/task')
        .post(taskController.save_task)

    app.route('/task/:id')
        .get(taskController.get_task)
        .put(taskController.update_task)
        .delete(taskController.delete_task)

    app.route('/task-by-project/:id')
        .get(taskController.view_task_by_project)

}
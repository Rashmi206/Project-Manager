module.exports = function (app) {

    const parentController = require('../controllers/parent.controller');

    app.route('/api/parents')
        .get(parentController.list_parents)
    app.route('/api/parent')
        .post(parentController.save_parent)

    app.route('/api/parent/:id')
        .get(parentController.get_parent)
        .put(parentController.update_parent)
        .delete(parentController.delete_parent)

    app.route('/api/parent-of-project/:id')
        .get(parentController.get_all_parents_of_project);

}
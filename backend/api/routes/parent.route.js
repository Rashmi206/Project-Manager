module.exports = function (app) {

    const parentController = require('../controllers/parent.controller');

    app.route('/parents')
        .get(parentController.list_parents)
    app.route('/parent')
        .post(parentController.save_parent)

    app.route('/parent/:id')
        .get(parentController.get_parent)
        .put(parentController.update_parent)
        .delete(parentController.delete_parent)

    app.route('/parent-of-project/:id')
        .get(parentController.get_all_parents_of_project);

}
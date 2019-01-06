module.exports = function (app) {

    const userController = require('../controllers/user.controller');

    app.route('/api/users')
        .get(userController.list_users)
    app.route('/api/user')
        .post(userController.save_user)

    app.route('/api/user/:id')
        .get(userController.get_user)
        .put(userController.update_user)
        .delete(userController.delete_user)

}
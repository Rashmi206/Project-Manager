module.exports = function (app) {
    
    const userController = require('../controllers/user.controller');

    app.route('/users')
        .get(userController.list_users)
    app.route('/user')
        .post(userController.save_user)

    app.route('/user/:id')
        .get(userController.get_user)
        .put(userController.update_user)
        .delete(userController.delete_user)

}
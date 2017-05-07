const User = require('../db/db').User;
var userController = {
    loadLogin: function(req, res) {
        res.render('user/login')
    },
    loadRegister: function (req, res) {
        res.render('user/register')
    }
};

module.exports = userController;

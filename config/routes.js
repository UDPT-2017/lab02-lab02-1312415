var Router = require('express').Router;
var controllers = require('../app/controllers');
const multipart = require('connect-multiparty');
const passport = require('../config/passport');
const Authentication = require('../config/authencation');
const multipartMiddleware = multipart();

module.exports = function(app){

    var indexRouter = Router().get('/', controllers.index.index);
    app.use('/', indexRouter);
    var userRouter = Router()
        .get('/login', controllers.user.loadLogin)
        .get('/register', controllers.user.loadRegister)
        .post('/register', multipartMiddleware, controllers.user.register)
        .post('/login', passport.authenticate('local',{ failureRedirect: '/user/login', failureFlash : true }), controllers.user.login)
        .post('/logout',controllers.user.logout);
    app.use('/user', userRouter);
    var aboutRouter = Router().get('/', controllers.about.index);
    app.use('/about', Authentication, aboutRouter);

};
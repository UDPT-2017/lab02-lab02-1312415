var Router = require('express').Router;
var controllers = require('../app/controllers');
const multipart = require('connect-multiparty');
const passport = require('../config/passport');
const Authentication = require('../config/authencation');
const multipartMiddleware = multipart();

module.exports = function(app){

    var indexRouter = Router()
        .get('/', controllers.index.index);

    var userRouter = Router()
        .get('/login', controllers.user.loadLogin)
        .get('/register', controllers.user.loadRegister)
        .post('/register', multipartMiddleware, controllers.user.register)
        .post('/login', passport.authenticate('local',{ failureRedirect: '/user/loginFail'}), controllers.user.login)
        .post('/logout',controllers.user.logout);

    var aboutRouter = Router()
        .get('/', controllers.about.index);

    var messageRouter = Router()
        .get('/', controllers.message.index)
        .get('/get', controllers.message.getMessage)
        .get('/new', controllers.message.newMessage)
        .post('/new',controllers.message.createMessage)
        .get('/:id', controllers.message.show);

    app.use('/', indexRouter);
    app.use('/user', userRouter);
    app.use('/about', Authentication, aboutRouter);
    app.use('/message', Authentication, messageRouter);
};
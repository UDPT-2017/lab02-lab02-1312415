const express = require('express');
const bodyParser = require('body-parser');
const session   = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../app/db/connection');

var sessionStore = new SequelizeStore({
    db: sequelize
});
sessionStore.sync();

module.exports = function(app){
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session( {
        secret : process.env.SESSION_SECRET || 'secret',
        resave : false,
        saveUninitialized : false,
        maxAge: null,
        store: sessionStore
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
};

var exphbs  = require('express-handlebars');
var path = require('path');
// var helpers = require('../app/helpers')


//require helpers
// helpers = require('../app/helpers');
//moi file rieng cho 1 loai/ham helpers nhu controller

module.exports = function(app){
    app.engine('hbs', exphbs({
        defaultLayout: 'main.hbs',
        layoutsDir: path.resolve('app/views/layouts/'),
        partialsDir: path.resolve('app/views/partials/'),
    }));

    app.set('view engine', 'hbs');
    app.set('views', path.resolve('app/views'));
}
const User = require('../db/db').User;
const SaltAndHash = require('../../config/password');
const cloudinary = require('../../config/cloudinary');
const _ = require('lodash');

var userController = {
    loadLogin: function (req, res) {
        res.render('user/login')
    },
    loadRegister: function (req, res) {
        res.render('user/register')
    },
    register: function (req, res) {
        if (!req.files.avatar.path) {
            req.flash('info', 'Need an avatar');
            res.redirect('/user/register');
            return;
        }
        cloudinary.uploader.upload(req.files.avatar.path, function (result) {
            var salt = SaltAndHash.salt();
            var hash = SaltAndHash.hash(salt, req.body.password);
            var body = _.pick(req.body, ['name', 'email', 'phone']);
            var user = User.build(body);
            if (result) {
                user.avatar = result.url;
            }
            user.hash = hash;
            user.salt = salt;
            user.validate();
            user.save().then(function () {
                req.flash('info', 'New user added');
                req.session.key = user.id;
                req.login(user, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    return res.redirect('/');
                });
            }).catch(function (e) {
                for (var i = 0; i < e.errors.length; i++) {
                    req.flash('info', e.errors[i].message);
                }

                res.redirect('/user/register');
            })
        });
    },
    login: function (req, res) {
        res.redirect('/');
        res.redirect(req.get('referer'));
    },
    logout: function(req,res){
        req.logout();
        res.redirect('/');
        res.redirect(req.get('referer'));
    }
};

module.exports = userController;

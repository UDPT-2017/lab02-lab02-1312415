const Message = require('../db/db').Message;
const User = require('../db/db').User;
const _ = require('lodash');

var messageController = {
    show: function (req, res) {
        Message.findOne({
                where:{id: req.params.id},
                include:[{
                    model: User,
                    as: "from"
                }]
            }).then(function (message) {
            res.render('message/show', {
                message: message,
                page: 'message'
            })
        })

    },
    index: function (req, res) {
        res.render('message/index', {
            page: 'message'
        })
    },
    newMessage: function (req, res) {
        res.render('message/new', {
            page: 'message'
        })
    },
    createMessage: function (req, res) {
        User.find({where: {email: req.body.to}})
            .then(function (user) {
                if (!user) {
                    req.flash('info', "no user with this email");
                    res.redirect('/message/new');
                    return;
                }
                if(user.id === req.user.id){
                    req.flash('info', "can't send message to yourself");
                    res.redirect('/message/new');
                    return;
                }
                var body = _.pick(req.body, ['title', 'content', 'userId']);
                var message = Message.build(body);
                message.toUserId = user.id;
                return message.save();
            })
            .then(function (message) {
                req.flash('info', "new message added");
                res.redirect('/message');
            })
            .catch(function (e) {
                console.log(e);
            for (var i = 0; i < e.errors.length; i++) {
                req.flash('info', e.errors[i].message);
            }

            res.redirect('/message/new');
        });
    },
    getMessage: function (req, res) {
        Message.findAll({
            where: {toUserId: req.query.userId},
            include: [{model: User, as: "from"}, {model: User, as: "to"}]
        }).then(function (messages) {
            if (req.user.id === parseInt(req.query.userId)) {
                res.send(messages);
            }
        })
    }
};

module.exports = messageController;

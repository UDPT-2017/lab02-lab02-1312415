const Message = require('../db/db').Message;
const User = require('../db/db').User;
const _ = require('lodash');
const showdown  = require('showdown');
const converter = new showdown.Converter();

var messageController = {
    show: function (req, res) {
        Message.findOne({
            where: {id: req.params.id},
            include: [{
                model: User,
                as: "from"
            }]
        }).then(function (message) {
            if(message.from.id !== req.user.id)
            {
                message.seen = true;
            }
            return message.save();
        }).then(function (message) {
            var html = converter.makeHtml(message.content);
            res.render('message/show', {
                message: message,
                page: 'message',
                html: html
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
                if (user.id === req.user.id) {
                    req.flash('info', "can't send message to yourself");
                    res.redirect('/message/new');
                    return;
                }
                var body = _.pick(req.body, ['title', 'content']);
                var message = Message.build(body);
                message.userId = req.user.id;
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
        if(req.query.All === "true"){
            Message.findAll({
                where: {toUserId: req.user.id},
                include: [{model: User, as: "from"}, {model: User, as: "to"}],
                order: [ [ 'createdAt', 'DESC' ] ],
                limit: parseInt(req.query.number)
            }).then(function (messages) {
                res.send(messages);
            })
        }
        else{
            Message.findAll({
                where: {toUserId: req.user.id},
                include: [{model: User, as: "from"}, {model: User, as: "to"}],
                order: [ [ 'createdAt', 'DESC' ] ],
                limit: 10,
                offset: parseInt(req.query.number)
            }).then(function (messages) {
                res.send(messages);
            })
        }

    },
    sentMessage: function (req, res) {
        if(req.query.All === "true"){
            Message.findAll({
                where: {userId: req.user.id},
                include: [{model: User, as: "from"}, {model: User, as: "to"}],
                order: [ [ 'createdAt', 'DESC' ] ],
                limit: parseInt(req.query.number)
            }).then(function (messages) {
                res.send(messages);
            })
        }else {
            Message.findAll({
                where: {userId: req.user.id},
                include: [{model: User, as: "from"}, {model: User, as: "to"}],
                order: [ [ 'createdAt', 'DESC' ] ],
                limit: 10,
                offset: parseInt(req.query.number)
            }).then(function (messages) {
                res.send(messages);
            })
        }
    }
};

module.exports = messageController;

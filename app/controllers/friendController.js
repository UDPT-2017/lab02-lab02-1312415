const User = require('../db/db').User;
const Friend = require('../db/db').Friend;
const _ = require('lodash');

var friendController = {
    index: function (req, res) {
        res.render('friend/index', {
            page: 'friend'
        })
    },
    getFriend: function (req, res) {
        var friendList = [];
        var userFriend = [];
        Friend.findAll({
            where: {userId: req.user.id},
        }).then(function (friends) {
            friends.forEach(function (friend) {
                friendList.push(friend.toUserId);
            });
            return User.findAll(
                {
                    where: {
                        id: {
                            $ne: req.user.id
                        }
                    }
                }
            )
        }).then(function (users) {
            users.forEach(function (user) {
                if (friendList.includes(user.id)) {
                    userFriend.push({
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        friend: true
                    })
                } else {
                    userFriend.push({
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        friend: false
                    })
                }
            });
            res.send(userFriend);
        })
    },
    addFriend: function (req, res) {
        if(req.user.id === parseInt(req.query.id)){
            res.send({success: false});
            return;
        }
        Friend.findAll({where: {userId: req.user.id, toUserId: req.query.id}}).then(function (friend) {
            if (friend.length !== 0) {
                res.send({success: false});
            } else {
                friend = Friend.build({userId: req.user.id, toUserId: req.query.id});
                friend.save().then(function () {
                    res.send({success: true});
                });
            }
        });

    },
    removeFriend: function (req, res) {
        Friend.findOne({where: {userId: req.user.id, toUserId: req.query.id}}).then(function (friend) {
            if (friend) {
                friend.destroy().then(function () {
                    res.send({success: true});
                })
            } else {
                res.send({succes: false})
            }
        });
    }

};

module.exports = friendController;

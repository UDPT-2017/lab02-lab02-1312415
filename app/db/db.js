const User = require('../models/User');
const Message = require('../models/Message');
const Friend = require('../models/Friend');

const session = require('express-session');
User.sync({force: true})
    .then(function () {
        Message.belongsTo(User, {as: "from", foreignKey: "userId"});
        User.hasMany(Message, {as: "sent", foreignKey: "userId"});
        Message.belongsTo(User, {as: "to", foreignKey: "toUserId"});
        User.hasMany(Message, {as: "received", foreignKey: "toUserId"});
        return Message.sync({force: true});
    })
    .then(function () {
        Friend.belongsTo(User, {as: "from", foreignKey: "userId"});
        Friend.belongsTo(User, {as: "to", foreignKey: "toUserId"});
        User.hasMany(Friend, {as: "friends", foreignKey: "userId"});
        return Friend.sync({force: true})
    });
module.exports = {
    User,
    Message,
    Friend
};


const User = require('../models/User');
const Message = require('../models/Message');
const session   = require('express-session');
User.sync()
    .then(function () {
        Message.belongsTo(User, {as: "from", foreignKey: "userId"});
        User.hasMany(Message, {as: "sent", foreignKey: "userId"});
        Message.belongsTo(User, {as: "to", foreignKey: "toUserId"});
        User.hasMany(Message, {as: "received", foreignKey: "toUserId"});
        return Message.sync();
    });
module.exports = {
    User,
    Message
};


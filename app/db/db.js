
const User = require('../models/User');


User.sync().then(function () {

});
module.exports = {
    User
};


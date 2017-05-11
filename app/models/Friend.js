const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Friend = sequelize.define('friend', {});


module.exports = Friend;
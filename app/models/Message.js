const sequelize = require('../db/connection');
const SQ = require('sequelize');

var Message = sequelize.define('message', {

        title: {
            type: SQ.STRING,
            validate: {
                len: {
                    args: [3],
                    msg: 'Must have a title and longer than 3 letters'
                }
            }
        },
        content:{
            type: SQ.STRING,
            validate: {
                len: {
                    args: [10],
                    msg: 'Must have content and longer than 10 letters'
                }
            }
        }
        ,
        seen:{
            type: SQ.BOOLEAN,
            defaultValue: false
        }
    })
    ;


module.exports = Message;
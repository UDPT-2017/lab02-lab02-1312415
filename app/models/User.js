const sequelize = require('../db/connection');
const SQ = require('sequelize');

var User = sequelize.define('user', {
        email: {
            type: SQ.STRING,
            allowNull: {
                args: false,
                msg: 'Must have email '
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Must be real email'
                }
            }

        },
        phone: {
            type: SQ.STRING,
            allowNull: {
                args: false,
                msg: 'Must have phone number '
            },
            validate: {
                len: {
                    args: [1],
                    msg: 'Must have a phone number'
                }
            }
        },
        name: {
            type: SQ.STRING,
            allowNull: {
                args: false,
                msg: 'Must have a name '
            }
            ,
            validate: {
                len: {
                    args: [1],
                    msg: 'Must have a name'
                }
            }

        },
        avatar: {
            type: SQ.STRING,
            allowNull: {
                args: false,
                msg: 'Must have an avatar'
            }
        },
        salt: {
            type: SQ.STRING,
            allowNull: {
                args: false
            }
        },
        hash: {
            type: SQ.STRING,
            allowNull: {
                args: false
            }
        },
        facebookId: {
            type: SQ.STRING
        }
    })
    ;


module.exports = User;
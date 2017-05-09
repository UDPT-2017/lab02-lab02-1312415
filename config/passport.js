var Strategy = require('passport-local').Strategy;
const SaltAndHash = require('../config/password');
const User = require('../app/db/db').User;
const passport = require('passport');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }, function (err, user) {
        done(err, user);
    });
});

passport.use(new Strategy({passReqToCallback: true}, function (req, email, password, cb) {
    User.findOne({where: {email: email}}).then(function (user) {
        if (!user) {
            return cb(null, false, req.flash('info', 'wrong email or password'));
        }
        if (SaltAndHash.validate(user.hash, user.salt, password)) {
            return cb(null, user, req.flash('info', 'welcome back'));
        }
        return cb(null, false, req.flash('info', 'wrong email or password'));
    });
}));
module.exports = passport;
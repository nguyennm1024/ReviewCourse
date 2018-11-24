const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { authenticate } = require('../models/person');

passport.use(new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'password'
}, (mail, password, done) => {
    authenticate(mail, password, done);

}))
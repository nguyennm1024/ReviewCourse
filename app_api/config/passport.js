const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { authenticate } = require('../model/person');

passport.use('local',new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'password'
}, (mail, password, done) => {
    authenticate(mail, password, done);

}))
// passport.serializeUser((user, done)=>{
//     done(null, user.id);
// });

// passport.deserializeUser((id, done)=>{
//     passport.deserializeUser((id, done) => {
//       User.findById(id).then((user) => {
//         done(null, user);
//       }).catch(done);
//     });
//   });
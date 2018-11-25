const passport = require('passport');
const jwt = require('jsonwebtoken')
const login = (req, res) => {
    const { mail, password } = req.body;

    if (!mail) return res.status(400).json({ message: 'mail is required' });
    if (!password) return res.status(400).json({ message: 'password is required' });
    passport.authenticate('local',  (err, user, message) => {

        if (err) return res.status(400).json(err);
        if (user) {
            const token = user.generateJwt();
            return res.status(201).json({ token });
        }
        return res.status(400).json(message);
    })(req, res);
    
    // jwt.sign(mail, password, (err,token) =>{
    //     res.json({token});
    // })
    
}

module.exports = { login };
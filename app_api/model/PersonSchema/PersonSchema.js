const name = 'person';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PersonSchema = new Schema({
    mail: {type : String, required: true, default:'nguyennm1024@vnu.edu.vn'},
    password: {type: String, required: true},
    _hashAlready: {type: Boolean, default: false},
    role: {type: String}
});

// PersonSchema.pre('save', () => {
//     let self = this;
//     if(self._hashAlready || !self.password) {
//         return next();
//     }
//     bcrypt.genSalt((err,salt) => {
//         if(err) return next(err);
//         bcrypt.hash(self.password,salt,(err,salt) => {
//             if(err) return next(err);
//             self.password = salt;
//             self._hashAlready = true;
//             next();
//         })
//     })
// });

// PersonSchema.pre('save', async function() {
//     const hash = await bcrypt.hashSync(this.password, 8)
//     this.password = hash
// })
PersonSchema.methods.comparePassword = function(password, callback) {
    let self = this;
    bcrypt.compare(password, self.password,(err, same) => {
        if(err) callback(err);
        else callback(null, same)
    })
}

PersonSchema.methods.changPassword = function(newPassword) {
    this._hashAlready = false;
    this.password = newPassword;
}

// PersonSchema.methods.generateJwt = function(more) {
//     const {mail, _type} = this;
//     return jwt.sign({
//         mail, _type, more 
//     }, process.env.JWT_SECRET)
// }


module.exports = PersonSchema;
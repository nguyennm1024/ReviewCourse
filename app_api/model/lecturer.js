const name = 'lecturer';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonSchema = require('./PersonSchema/PersonSchema');
require('mongoose-schema-extend');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const extend = (Schema, obj) => (
    new mongoose.Schema(
      Object.assign({}, Schema.obj, obj)
  )
);
const lecturerSchema = extend(PersonSchema,{
    birthday: {type: Date},
    phoneNumber: {type: String, require},
    vnumail: {type: String},
    note :{type: String, default:''},
    semester_id:{type: Number},
    teachingClass:[{type: Schema.Types.ObjectId, ref:"class"}]
});
lecturerSchema.methods.generateJwt = function(more) {
    const {mail, role} = this;
    return jwt.sign({
        mail, role, more 
    }, "JWT_SECRET")
  }
  
  lecturerSchema.methods.comparePassword = function(password, callback) {
    let self = this;
    // bcrypt.compareSync(password, self.password,(err, same) => {
    //   console.log(err);
      
    //     if(err) callback(err);
    //     else callback(null, same)
    // })
    let same = bcrypt.compareSync(password,self.password)
    callback(null,same)
  }

lecturerSchema.methods.generateJwt = function(more) {
    const {mail, _type} = this;
    return jwt.sign({
        mail, _type, more 
    }, process.env.JWT_SECRET)
  }
module.exports = mongoose.model(name,lecturerSchema);
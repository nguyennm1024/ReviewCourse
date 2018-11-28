const name = 'student';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonalSchema = require('./PersonSchema/PersonSchema');
require('mongoose-schema-extend');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const extend = (Schema, obj) => (
    new mongoose.Schema(
      Object.assign({}, Schema.obj, obj)
    )
  );

  const studentSchema = extend(PersonalSchema,{
    //admin provide
    MSSV: {type: String, required: true},
    studentName: {type: String, required: true},
    birth: {type: Date, default: Date.now()},
    classRoom: {type: String, required: true},

    //user manage
    avatar: {type: String},
    phoneNumber: {type: String},
    semester_id: {type: Number, required: true},
    classRegistered:[{type: Schema.Types.ObjectId, ref: "class"}]
});

studentSchema.pre('save', async function() {
  const hash = await bcrypt.hashSync(this.password, 8)
  this.password = hash
  this._hashAlready = true;
})

studentSchema.methods.generateJwt = function(more) {
  const {mail, role} = this;
  //console.log(role);
  return jwt.sign({
      mail, role, more 
  }, "JWT_SECRET",{expiresIn:'2h'})
}

studentSchema.methods.comparePassword = function(password, callback) {
  let self = this;
  // bcrypt.compareSync(password, self.password,(err, same) => {
  //   console.log(err);
    
  //     if(err) callback(err);
  //     else callback(null, same)
  // })
  let same = bcrypt.compareSync(password,self.password)
  callback(null,same)
}
module.exports = mongoose.model(name,studentSchema);
const name = 'student';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonalSchema = require('./PersonSchema/PersonSchema');
require('mongoose-schema-extend');
const bcrypt = require('bcrypt')
const extend = (Schema, obj) => (
    new mongoose.Schema(
      Object.assign({}, Schema.obj, obj)
    )
  );

  const studentSchema = extend(PersonalSchema,{
    //admin provide
    MSSV: {type: String, required: true},
    name: {type: String, required: true},
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
  const {mail, _type} = this;
  return jwt.sign({
      mail, _type, more 
  }, process.env.JWT_SECRET)
}
module.exports = mongoose.model(name,studentSchema);
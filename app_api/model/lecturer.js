const name = 'lecturer';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonSchema = require('./PersonSchema/PersonSchema');
require('mongoose-schema-extend');
const bcrypt = require('bcrypt')

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
lecturerSchema.pre('save', async function() {
    const hash = await bcrypt.hashSync(this.password, 8);
    this.password = hash;
    this._hashAlready = true;
});

lecturerSchema.methods.generateJwt = function(more) {
    const {mail, _type} = this;
    return jwt.sign({
        mail, _type, more 
    }, process.env.JWT_SECRET)
  }
module.exports = mongoose.model(name,lecturerSchema);
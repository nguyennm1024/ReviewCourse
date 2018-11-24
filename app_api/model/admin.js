const name = 'admin';
const mongoose = require('mongoose');
const PersonSchema = require('./PersonSchema/PersonSchema');
const { Schema } = mongoose;
const schema_extend = require('mongoose-schema-extend')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const extend = (Schema, obj) => (
    new mongoose.Schema(
      Object.assign({}, Schema.obj, obj)
    )
  );

const adminSchema = extend(PersonSchema, {
    name: {type: String, required: true},
    phoneNumber:{type: String, required: true}
});
adminSchema.pre('save', async function() {
  const hash = await bcrypt.hashSync(this.password, 8)
  this.password = hash
  this._hashAlready = true;
})

adminSchema.methods.generateJwt = function(more) {
  const {mail, _type} = this;
  return jwt.sign({
      mail, _type, more 
  }, process.env.JWT_SECRET)
}

module.exports = mongoose.model(name,adminSchema);
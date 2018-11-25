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
  const {mail, role} = this;
  return jwt.sign({
      mail, role, more 
  }, "JWT_SECRET")
}

adminSchema.methods.comparePassword = function(password, callback) {
  let self = this;
  // bcrypt.compareSync(password, self.password,(err, same) => {
  //   console.log(err);
    
  //     if(err) callback(err);
  //     else callback(null, same)
  // })
  let same = bcrypt.compareSync(password,self.password)
  callback(null,same)
}

module.exports = mongoose.model(name,adminSchema);
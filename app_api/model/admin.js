const name = 'admin';
const mongoose = require('mongoose');
const PersonSchema = require('./PersonSchema/PersonSchema');
const { Schema } = mongoose;
const schema_extend = require('mongoose-schema-extend')

const extend = (Schema, obj) => (
    new mongoose.Schema(
      Object.assign({}, Schema.obj, obj)
    )
  );

const adminSchema = extend(PersonSchema,{
    name: {type: String, required: true},
    phoneNumber:{type: String, required: true}
});

module.exports = mongoose.model(name, adminSchema);
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

const adminSchema = PersonSchema.discriminator(name,new Schema ({
    name: {type: String, required: true},
    phoneNumber:{type: String, required: true}
},{discriminatorKey: '_type'}));

module.exports = adminSchema;
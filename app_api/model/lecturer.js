const name = 'lecturer';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonSchema = require('./PersonSchema/PersonSchema');
require('mongoose-schema-extend');

const extend = (Schema, obj) => (
    new mongoose.Schema(
      Object.assign({}, Schema.obj, obj)
    )
  );
const lecturerSchema = PersonSchema.discriminator(name,new Schema({
    birthday: {type: Date},
    phoneNumber: {type: String, require},
    vnumail: {type: String},
    note :{type: String, default:''}
}, {discriminatorKey: '_type'}));

module.exports =lecturerSchema;
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
const lecturerSchema = extend(PersonSchema,{
    birthday: {type: Date},
    phoneNumber: {type: String, require},
    vnumail: {type: String},
    note :{type: String, default:''},
    semester_id:{type: Number},
    teachingClass:[{type: Schema.Types.ObjectId, ref:"class"}]
});

module.exports = mongoose.model(name,lecturerSchema);
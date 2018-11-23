const name = 'student';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonalSchema = require('./PersonSchema/PersonSchema');
require('mongoose-schema-extend');

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

module.exports = mongoose.model(name,studentSchema);
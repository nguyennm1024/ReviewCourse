const name = 'class';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    class_id:{type: String, required: true},
    subject_id:{type: String},
    semester_id :{type: Number},
    lecturer_id:{type:String},
    listStudent: {type: [String]},
    name:{type: String}
});

module.exports = mongoose.model(name, classSchema);
const name = 'class';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    subject_id:{type: String},
    semester_id :{type: Number},
    lecturer_id:{type:Schema.Types.ObjectId, ref:"lecturer"},
    listStudent: [{type: Schema.Types.ObjectId, ref:'student'}],
    className:{type: String},
    semantic_class_id:{type: String}
});

module.exports = mongoose.model(name, classSchema);
const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')

const allClass = async (req, res) => {
    const {_id} = req.body;
    let lecturerClass = await Lecturer.find({_id}).populate('teachingClass').exec();
    if(!lecturerClass) return res.status(400).json({message: 'Class of lecturer not found'});
    return res.status(200).json(lecturerClass);
}

module.exports = {allClass};
const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')

const allClass = async (req, res) => {
    const {_id} = req.body;
    let lecturerClass = await Lecturer.findOne({_id}).populate('teachingClass').exec();
    if(!lecturerClass) return res.status(400).json({message: 'Class of lecturer not found'});
    return res.status(200).json(lecturerClass);
}

const studentInClass = async (req, res) => {
    const {_id} = req.body;
    let classSelected = await Class.findOne({_id}).exec();
    if(!classSelected) return res.status(400).json({message:'Class not found'})

    let students = await Class.findOne({_id}).populate('listStudent').populate('lecturer_id').exec();
    listStudent = students.listStudent;
    lecturers = students.lecturer_id;
    return res.status(200).json({"listStudent":listStudent, "lecturer": lecturers});
}

module.exports = {allClass, studentInClass};
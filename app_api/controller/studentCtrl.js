const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')

const getClass = async (req,res) => {
    const {_id} = req.body;
    if(!_id) return res.status(400).json({message: "Student ID is required"});
    let studentClass = await Student.findOne({_id}).populate('classRegistered').exec();
    if(!studentClass) return res.status(400).json({message: "Student not found"});
    return res.status(200).json(studentClass);
}

const getReport = async (req,res) => {
    const {student_id, class_id} = req.body;
    if(!student_id) return res.status(400).json({message:'Student ID is required'});
    if(!class_id) return res.status(400).json({message:'Class ID is required'});
    let studentReport = await Report.findOne({student_id, class_id});
    if(!studentReport) return res.status(400).json(new Report());

    return res.status(200).json(studentReport);
}

module.exports = {getClass,
    getReport};
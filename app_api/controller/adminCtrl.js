const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')

const updateInfo = (req, res) => {
    const {mail} = req.payload;
    const {name, phoneNumber, password} = req.body;
    if(!name) return res.status(400).json({message: "Name is required"});
    if(!phoneNumber) res.status(400).json({message: "Phone number is required"});
    if(!password) res.status(400).json({message:"Password is required"});

    Admin.findOne({mail}, (err, admin) =>{
        if(err) return res.status(400).json({err});
        if(!admin) return res.status(400).json({message: 'no admin founded'});

        admin.name = name;
        admin.phoneNumber = phoneNumber;
        admin.password = password;

        admin.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: 'success'});
        })
    })
}

const allStudent = (req, res) => {
    Student.find((err, students) => {
        if(err) return res.status(400).json(err);

        res.status(200).json({students});
    })
}

const allLecture = (req, res) => {
    Lecturer.find((err, lecturers) => {
        if(err) return res.status(400).json(err);

        res.status(200).json({lecturers});
    })
}

const createStudent = (req, res) => {
    const {mail, password} = req.body;

    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    const {MSSV,name,birth,classRoom,avatar,phoneNumber,semester_id,classRegistered} = req.body;

    const newStudent = new Student();
    newStudent.mail =mail;
    newStudent.password = password;
    newStudent.MSSV = MSSV;
    newStudent.name = name;
    newStudent.birth = birth;
    newStudent.classRoom = classRoom;
    newStudent.avatar = avatar;
    newStudent.phoneNumber = phoneNumber;
    newStudent.semester_id = semester_id;
    newStudent.classRegistered = classRegistered;

    newStudent.save(e => {
        if(e) return res.status(500).json(e);

        return res.status(200).json({message: 'success'});
    })
}

const createLecturer = (req,res) =>{
    const {mail, password} = req.body;
    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    const {birthday,phoneNumber,vnumail,note} = req.body;

    const newLecturer = new Lecturer();
    newLecturer.mail = mail;
    newLecturer.password = password;
    newLecturer.birthday = new Date(2000,1,1);
    newLecturer.phoneNumber = phoneNumber;
    newLecturer.vnumail = vnumail;
    newLecturer.note = note;

    newLecturer.save(e => {
        if(e) return res.status(500).json(e);

        return res.status(200).json({message: 'success'});
    })
}

const deleteStudent = (req,res) => {
    const {mail} = req.body;

    Student.findOneAndDelete({mail}, (err, resp) => {
        if(err) return res.status(400).json(err);

        return res.status(200).json({message: 'success'});
    });
}

const deleteLecturer = (req, res) => {
    const { mail } = req.body;

    Lecturer.findOneAndRemove({ mail }, (err, resp) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({ message: 'success' });
    });
}

module.exports = {updateInfo,
    allStudent,
    allLecture,
    createStudent,
    createLecturer,
    deleteStudent,
    deleteLecturer};
const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')

const updateInfo = (req, res) => {
    const {mail} = req.body;
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

const createStudent = async (req, res) => {
    const {mail, password} = req.body;

    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    let std_check = await Student.findOne({mail}).exec();
    if(std_check) return res.status(400).json({message:'Student existed'});

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

    //add type
    newStudent.role = 'student';

    newStudent.save(e => {
        if(e) return res.status(500).json(e);

        return res.status(200).json({message: 'success'});
    })
    // let students = req.body;
    // return res.status(200).json(students[1]);
}

const createLecturer = async (req,res) =>{
    const {mail, password} = req.body;
    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    let lecturer_check = await Lecturer.findOne({mail}).exec();
    if(lecturer_check) return res.status(400).json({message:'Lecturer existed'});
    const {birthday,phoneNumber,vnumail,note} = req.body;

    const newLecturer = new Lecturer();
    newLecturer.mail = mail;
    newLecturer.password = password;
    newLecturer.birthday = new Date(2000,1,1);
    newLecturer.phoneNumber = phoneNumber;
    newLecturer.vnumail = vnumail;
    newLecturer.note = note;

    newLecturer.role = 'lecturer';

    newLecturer.save(e => {
        if(e) return res.status(500).json(e);

        return res.status(200).json({message: 'success'});
    })
}

const deleteStudent = async (req,res) => {
    const {mail} = req.body;

    let std_check = await Student.findOne({mail}).exec();
    if(!std_check) return res.status(400).json({message:'Student not found'});
    Student.findOneAndDelete({mail}, (err, resp) => {
        if(err) return res.status(400).json(err);

        return res.status(200).json({message: 'success'});
    });
}

const deleteLecturer = async (req, res) => {
    const { mail } = req.body;

    let lec_check = await Lecturer.findOne({mail}).exec();
    if(!lec_check) return res.status(400).json({message:'Lecturer not found'});

    Lecturer.findOneAndRemove({ mail }, (err, resp) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({ message: 'success' });
    });
}

const allClass = (req, res) => {
    const {semester_id} = req.body;
    Class.find({semester_id}, (err, listClass) =>{
        if(err) return res.status(400).json(err);

        return res.status(200).json(listClass);
    })
}

const studentInClass = async (req, res) => {
    const {_id} = req.body;
    let classSelected = await Class.findOne({_id}).exec();
    if(!classSelected) return res.status(400).json({message:'Class not found'})

    let students = await Class.findOne({_id}).populate('listStudent').exec();
    return res.status(200).json(students);
}

const getStudentReport = async (req,res) => {
    const {student_id,class_id} = req.body;
    if(!student_id) return res.status(400).json({message: 'Student_id is required'});
    if(!class_id) return res.status(400).json({message:'Class_id is required'});

    let reportOfStudent = await Report.findOne({student_id, class_id}).exec();
    if(!reportOfStudent) return res.status(400).json({message: 'Report not found'});
    return res.status(200).json(reportOfStudent);
}

// const createClass = (subject_id, semester_id) => {
//     const newClass = new Class();
//     newClass.subject_id = subject_id;
//     newClass.semester_id = semester_id;
//     newClass.save((e, record) => {
//         if(e) console.log("Class was not created");
//         else
//             console.log("Class created successfully");
//         console.log(record);
//     }, );
// }



module.exports = {updateInfo,
    allStudent,
    allLecture,
    createStudent,
    createLecturer,
    deleteStudent,
    deleteLecturer,
    allClass,
    studentInClass,
    getStudentReport};
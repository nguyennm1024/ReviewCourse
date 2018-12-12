const Admin = require('./admin')
const Student = require('./student')
const Lecturer = require('./lecturer')
const Class = require('./class')
const Report = require('./report')
//const PersonSchema = require('./PersonSchema/PersonSchema')

const admins = [{
    mail:"admin@vnu.edu.vn",
    password:"123",
    adminName:"nguyen",
    phoneNumber:"23456",
    role: "admin"
}] 

const classes = [{
    subject_id:'3453432',
    semester_id: 3,
    className:'Phat trien ung dung web',
    listStudent:['5bf8538e335556137a382880']
},
{
    subject_id:'8678',
    semester_id: 4,
    className:'Tri tue nhan tao'
}]

const reports = [{
    semester_id:5,
    subject_id:'INT3307',
    student_id:'5bf8538e335556137a382880',
    class_id:'5bf8681c9468451caa7d901e'
}]

const students = [{
    mail: '16021078@vnu.edu.vn',
    password: '123',
    MSSV:'16021078',
    studentName:'nguyen',
    birth: new Date(2000,1,1),
    classRoom:'K61-C-CLC',
    semester_id: 5,
    role:"student",
    classRegistered:['5bf8985afad8ed37da083296']
}]

const lecturers = [{
    lecturerName: 'Lê Đình Thanh',
    semester_id: 5,
    mail: 'thanhld@vnu.edu.vn',
    password:'123',
    phoneNumber:'0981999999',
    note:'Web dev teacher',
    role:"lecturer",
    teachingClass:['5bf9126b557bdc1cac9b6bde','5bf9126b557bdc1cac9b6bdd']
}]
createSeed();
// let idClass;
// const createClass = async (subject_id, semester_id) => {
//     const newClass = new Class();
//     newClass.subject_id = subject_id;
//     newClass.semester_id = semester_id;
//     await newClass.save((e, record) => {
//         if(e) console.log("Class was not created");
//         else
//             console.log("Class created successfully");
//         idClass = record._id;
//         console.log(idClass)
//     }, );
// }
// function execute() {
//     createClass('2342',4);
// }
// execute();

// const createClass = (subject_id, semester_id, semantic_class_id, className) => {
//     const newClass = new Class();
//     newClass.subject_id = subject_id;
//     newClass.semester_id = semester_id;
//     newClass.semantic_class_id = semantic_class_id;
//     newClass.className =className;
//     newClass.save((err, record) => {
//         if(err) console.log(err)
//         else console.log(record)
//     })
// }

// const addClassToStudent = async (mail,MSSV, classRoom, semester_id, semantic_class_id, subject_id, studentName, className) =>{
//     Student.findOne({mail, semester_id}, async (err, myStudent) => {
//         if(!myStudent) {
//             myStudent = new Student();
//             myStudent.mail = mail;
//             myStudent.password = 'DEFAULT_PASSWORD';
//             myStudent.MSSV = MSSV;
//             myStudent.classRoom = classRoom,
//             myStudent.semester_id = semester_id
//             myStudent.studentName = studentName
//         }
//         const class_check = await Class.findOne({semantic_class_id, semester_id}).exec()
//         if(!class_check) await createClass(subject_id, semester_id, semantic_class_id, className)
//         const myClass = await Class.findOne({semantic_class_id, semester_id}).exec()
//         myStudent.classRegistered.push(myClass._id)
//         myStudent.save();
        
//     })
// }

// addClassToStudent('16021078@vnu.edu.vn','16021078','K61C-CLC',4,'INT3307 1','INT3307', 'Nguyen');

async function createSeed() {
    let _class = await Class.findOne({}).exec();
    if(!_class)
        await Class.create(classes);

    let _admin = await Admin.findOne({}).exec();
    if(!_admin)
        await Admin.create(admins);

    let _report = await Report.findOne({}).exec();
    if(!_report)
        await Report.create(reports);
    

    let _student = await Student.findOne({}).exec();
    if(!_student)
        await Student.create(students);

    let _lecture = await Lecturer.findOne({}).exec();
    if(!_lecture)
        await Lecturer.create(lecturers);
}
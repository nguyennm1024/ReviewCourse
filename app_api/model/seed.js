const Admin = require('./admin')
const Student = require('./student')
const Lecturer = require('./lecturer')
const Class = require('./class')
const Report = require('./report')
//const PersonSchema = require('./PersonSchema/PersonSchema')

const admins = [{
    mail:"admin@vnu.edu.vn",
    password:"123",
    name:"nguyen",
    phoneNumber:"23456",
    role: "admin"
}] 

const classes = [{
    subject_id:'3453432',
    semester_id: 3,
    name:'Phat trien ung dung web',
    listStudent:['5bf8538e335556137a382880']
},
{
    subject_id:'8678',
    semester_id: 4,
    name:'Tri tue nhan tao'
}]

const reports = [{
    subject_id:'INT3307',
    student_id:'5bf8538e335556137a382880',
    class_id:'5bf8681c9468451caa7d901e'
}]

const students = [{
    mail: '16021078@vnu.edu.vn',
    password: '123',
    MSSV:'16021078',
    name:'nguyen',
    birth: new Date(2000,1,1),
    classRoom:'K61-C-CLC',
    semester_id: 5,
    role:"student",
    classRegistered:['5bf8985afad8ed37da083296']
}]

const lecturers = [{
    mail: 'thanhld@vnu.edu.vn',
    password:'123',
    phoneNumber:'0981999999',
    note:'Web dev teacher',
    role:"lecturer"
}]
createSeed();

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
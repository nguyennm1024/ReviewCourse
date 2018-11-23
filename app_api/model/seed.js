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
    class_id: '123423',
    subject_id:'3453432',
    semester_id: 3,
    lecturer_id:'234234',
    listStudent: ['23423', '234325212'],
    name:'Phat trien ung dung web'
},
{
    class_id: '3453345',
    subject_id:'8678',
    semester_id: 4,
    lecturer_id:'234234',
    listStudent: ['23423', '234325212'],
    name:'Tri tue nhan tao'
}]

const reports = [{
    student_id: '16021078',
    class_id: '84651648',
    subject_id:'INT3307'
}]

const students = [{
    mail: '16021078@vnu.edu.vn',
    password: '123',
    MSSV:'16021078',
    name:'nguyen',
    birth: new Date(2000,1,1),
    classRoom:'K61-C-CLC',
    semester_id: 5,
    role:"student"
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
    await Class.create(classes);
    let _class = await Class.find({}).exec();

    await Admin.create(admins);
    let _admin = await Admin.find({}).exec();

    await Report.create(reports);
    let _report = await Report.find({}).exec();

    await Student.create(students);
    let _student = await Student.find({}).exec();

    await Lecturer.create(lecturers);
    let _lecture = await Lecturer.find({}).exec();
}
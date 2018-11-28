const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')

const DEFAULT_PASSWORD = '123456789'
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

const updateReport = async (req,res) =>{
    const {student_id, class_id,giangDuong,trangThietBi,hoTroKipThoi,mucTieuMonHoc,thoiLuongMonHoc,taiLieu,trangBiKienThuc,giangVienThucHienDayDu,giangVienHuongDanBatDauMonHoc,phuongPhapGiangDay,giangVienTaoCoHoi,giangVienGiupDocLap,giangVienThucTien,giangVienSuDungCongCu,giangVienGiaoDucTuCachNguoiHoc,hieuBai,cachDanhGia,noiDungDanhGia,tacDungThongTinPhanHoi} = req.body;

    Report.findOne({student_id, class_id}, async (err, studentReport) =>{
        if(err) return res.status(400).json({message: 'Report not found'})
        studentReport.giangDuong = giangDuong;
        studentReport.trangThietBi = trangThietBi;
        studentReport.hoTroKipThoi = hoTroKipThoi;
        studentReport.mucTieuMonHoc = mucTieuMonHoc;
        studentReport.thoiLuongMonHoc = thoiLuongMonHoc;
        studentReport.taiLieu = taiLieu;
        studentReport.trangBiKienThuc = trangBiKienThuc;
        studentReport.giangVienThucHienDayDu = giangVienThucHienDayDu;
        studentReport.giangVienHuongDanBatDauMonHoc = giangVienHuongDanBatDauMonHoc;
        studentReport.phuongPhapGiangDay = phuongPhapGiangDay;
        studentReport.giangVienTaoCoHoi = giangVienTaoCoHoi;
        studentReport.giangVienGiupDocLap = giangVienGiupDocLap;
        studentReport.giangVienThucTien = giangVienThucTien;
        studentReport.giangVienSuDungCongCu = giangVienSuDungCongCu;
        studentReport.giangVienGiaoDucTuCachNguoiHoc = giangVienGiaoDucTuCachNguoiHoc;
        studentReport.hieuBai = hieuBai;
        studentReport.cachDanhGia = cachDanhGia;
        studentReport.noiDungDanhGia = noiDungDanhGia;
        studentReport.tacDungThongTinPhanHoi = tacDungThongTinPhanHoi;
        studentReport.save(err => {
            if(err) return res.status(400).json(err);
            return res.status(200).json({message: 'success'});
        });
    });
}

const setReportToDefault = async (req,res) =>{
    const {student_id, class_id,giangDuong,trangThietBi,hoTroKipThoi,mucTieuMonHoc,thoiLuongMonHoc,taiLieu,trangBiKienThuc,giangVienThucHienDayDu,giangVienHuongDanBatDauMonHoc,phuongPhapGiangDay,giangVienTaoCoHoi,giangVienGiupDocLap,giangVienThucTien,giangVienSuDungCongCu,giangVienGiaoDucTuCachNguoiHoc,hieuBai,cachDanhGia,noiDungDanhGia,tacDungThongTinPhanHoi} = req.body;

    Report.findOne({student_id, class_id}, async (err, studentReport) =>{
        if(err) return res.status(400).json({message: 'Report not found'})
        studentReport.giangDuong = 0;
        studentReport.trangThietBi = 0;
        studentReport.hoTroKipThoi = 0;
        studentReport.mucTieuMonHoc = 0;
        studentReport.thoiLuongMonHoc = 0;
        studentReport.taiLieu = 0;
        studentReport.trangBiKienThuc = 0;
        studentReport.giangVienThucHienDayDu = 0;
        studentReport.giangVienHuongDanBatDauMonHoc = 0;
        studentReport.phuongPhapGiangDay = 0;
        studentReport.giangVienTaoCoHoi = 0;
        studentReport.giangVienGiupDocLap = 0;
        studentReport.giangVienThucTien = 0;
        studentReport.giangVienSuDungCongCu = 0;
        studentReport.giangVienGiaoDucTuCachNguoiHoc = 0;
        studentReport.hieuBai = 0;
        studentReport.cachDanhGia = 0;
        studentReport.noiDungDanhGia = 0;
        studentReport.tacDungThongTinPhanHoi = 0;
        studentReport.save(err => {
            if(err) return res.status(400).json(err);
            return res.status(200).json({message: 'success'});
        });
    });
}

const createClass = (subject_id, semester_id, semantic_class_id, className) => {
    const newClass = new Class();
    newClass.subject_id = subject_id;
    newClass.semester_id = semester_id;
    newClass.semantic_class_id = semantic_class_id;
    newClass.className = className;
    newClass.save((err, record) => {
        if(err) console.log(err)
        else console.log(record)
    })
}

const addClassToStudent = async (mail,MSSV, classRoom, semester_id, semantic_class_id, subject_id, studentName, className) =>{
    let student_check = await Student.findOne({mail, semester_id})
    if(!student_check) {
        const myStudent = new Student();
        myStudent.mail = mail;
        myStudent.password = DEFAULT_PASSWORD;
        myStudent.MSSV = MSSV;
        myStudent.classRoom = classRoom,
        myStudent.semester_id = semester_id
        myStudent.studentName = studentName
        await myStudent.save();
    }
    const class_check = await Class.findOne({semantic_class_id, semester_id}).exec()
    if(!class_check) await createClass(subject_id, semester_id, semantic_class_id, className)
    const myClass = await Class.findOne({semantic_class_id, semester_id}).exec()
    readStudent = await Student.findOne({mail, semester_id})
    readStudent.classRegistered.push(myClass._id)
    readStudent.save();

}
const addStudentToClass = async (semester_id, semantic_class_id, subject_id, className, mail, classRoom, MSSV, studentName) => {
    let class_check = Class.findOne({semester_id, semantic_class_id})
    if(!class_check) {
        await createClass(subject_id, semester_id, semantic_class_id, className)
    }
    let student_check = await Student.findOne({mail, semester_id}).exec();
    if(!student_check) {
        student_check = new Student();
        student_check.mail = mail;
        student_check.password = DEFAULT_PASSWORD;
        student_check.MSSV = MSSV;
        student_check.classRoom = classRoom,
        student_check.semester_id = semester_id
        student_check.studentName = studentName
        await student_check.save()
    }
    const find_class = await Class.findOne({semester_id, semantic_class_id}).exec();
    const find_student = await Student.findOne({mail, semester_id});
    find_class.listStudent.push(find_student._id);
    find_class.save();
}

const createReport = async (req,res) => {
    const {mail, MSSV,classRoom,semester_id, semantic_class_id, subject_id, studentName, className} =req.body;
    await addClassToStudent(mail, MSSV, classRoom, semester_id, semantic_class_id, subject_id, studentName, className);
    await addStudentToClass(semester_id, semantic_class_id, subject_id, className, mail, classRoom, MSSV, studentName);
    let find_student = await Student.findOne({mail}).exec();
    let find_class = await Class.findOne({semantic_class_id, semester_id}).exec();
    let student_id = find_student._id
    let class_id = find_class._id
    Report.findOne({student_id, class_id}, async (err,record) => {
        if(!record) {
            newReport = new Report();
            newReport.student_id = find_student._id;
            newReport.class_id = find_class._id;
            newReport.subject_id = find_class.subject_id
            await newReport.save();
            return res.status(200).json({message:'success'});
        }
        return res.status(400).json({message:'Report existed'});
    })
}

module.exports = {updateInfo,
    allStudent,
    allLecture,
    createStudent,
    createLecturer,
    deleteStudent,
    deleteLecturer,
    allClass,
    studentInClass,
    getStudentReport,
    updateReport,
    setReportToDefault,
    createReport};
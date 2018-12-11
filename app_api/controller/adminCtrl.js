const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')
const GeneralReport = require('../model/reportGeneral')

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

        admin.name = adminName;
        admin.phoneNumber = phoneNumber;
        admin.password = password;

        admin.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: 'success'});
        })
    })
}

const allStudent = (req, res) => {
    Student.find().distinct('mail', async (err, students) => {
        if(err) return res.status(400).json(err);
        results = []
        let i;
        for (i = 0; i < students.length; i++) {
            let mail = students[i];
            let result = await Student.findOne({mail});
            console.log(mail)
            results.push(result);
        }
        res.status(200).json(results);
    })
}

const allLecture = async (req, res) => {
    
    Lecturer.find().distinct('mail', async (err, lecturers) => {
        if(err) return res.status(400).json(err);
        results = []
        let i;
        for (i = 0; i < lecturers.length; i++) {
            let mail = lecturers[i];
            let result = await Lecturer.findOne({mail});
            console.log(mail)
            results.push(result);
        }
        res.status(200).json(results);
    })
}

const createStudent = async (req, res) => {
    const {mail, password} = req.body;
    const {MSSV,studentName,birth,classRoom,avatar,phoneNumber,semester_id,classRegistered} = req.body;

    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    let std_check = await Student.findOne({mail,semester_id}).exec();
    if(std_check) return res.status(400).json({message:'Student existed'});


    const newStudent = new Student();
    newStudent.mail =mail;
    newStudent.password = password;
    newStudent.MSSV = MSSV;
    newStudent.studentName = studentName;
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

const updateInfoStudent = (req, res) => {
    const {mail} = req.body;
    const {studentName, phoneNumber, password, MSSV, birth, classRoom, semester_id, classRegistered} = req.body;
    if(!studentName) return res.status(400).json({message: "Name is required"});
    if(!phoneNumber) res.status(400).json({message: "Phone number is required"});
    if(!password) res.status(400).json({message:"Password is required"});

    Student.findOne({mail}, (err, student) =>{
        if(err) return res.status(400).json({err});
        if(!student) return res.status(400).json({message: 'no student founded'});

        student.mail =mail;
        student.password = password;
        student.MSSV = MSSV;
        student.studentName = studentName;
        student.birth = birth;
        student.classRoom = classRoom;
        student.phoneNumber = phoneNumber;
        student.semester_id = semester_id;
        student.classRegistered = classRegistered;
        student.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: 'success'});
        })
    })
}

const createLecturer = async (req,res) =>{
    const {mail, password,semester_id} = req.body;
    if(!mail) return res.status(400).json({message: 'mail is required'});
    if(!password) return res.status(400).json({message: 'password is required'});

    let lecturer_check = await Lecturer.findOne({mail,semester_id}).exec();
    if(lecturer_check) return res.status(400).json({message:'Lecturer existed'});
    const {birthday,phoneNumber,vnumail,note, lecturerName} = req.body;

    const newLecturer = new Lecturer();
    newLecturer.mail = mail;
    newLecturer.password = password;
    newLecturer.lecturerName = lecturerName;
    newLecturer.birthday = new Date(2000,1,1);
    newLecturer.phoneNumber = phoneNumber;
    newLecturer.vnumail = vnumail;
    newLecturer.note = note;
    newLecturer.semester_id = semester_id;

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
    let myClass = await Class.findOne({semantic_class_id, semester_id}).exec()
    if(!myClass)
        await createClass(subject_id, semester_id, semantic_class_id,className)
    myClass = await Class.findOne({semantic_class_id, semester_id}).exec()
    readStudent = await Student.findOne({mail, semester_id})
    readStudent.classRegistered.push(myClass._id)
    readStudent.save();

}

const addClassToLecturer = async (semantic_class_id, semester_id, mail, lecturerName,subject_id, className) => {
    let lecturer_check = await Lecturer.findOne({mail, semester_id})
    if(!lecturer_check) {
        const myLecturer = new Lecturer();
        myLecturer.mail = mail;
        myLecturer.password = DEFAULT_PASSWORD;
        myLecturer.semester_id = semester_id
        myLecturer.lecturerName = lecturerName
        await myLecturer.save();
    }
    const class_check = await Class.findOne({semantic_class_id, semester_id}).exec()
    if(!class_check) await createClass(subject_id, semester_id, semantic_class_id, className)
    let myClass = await Class.findOne({semantic_class_id, semester_id}).exec()
    if(!myClass)
        await createClass(subject_id, semester_id, semantic_class_id,className)
    myClass = await Class.findOne({semantic_class_id, semester_id}).exec()
    readLecturer = await Lecturer.findOne({mail, semester_id})
    readLecturer.teachingClass.push(myClass._id)
    readLecturer.save();
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
    const {lecturerMail, studentMail, MSSV,classRoom,semester_id, semantic_class_id, subject_id, studentName, className, lecturerName} =req.body;
    await addClassToLecturer(semantic_class_id, semester_id,lecturerMail, lecturerName, subject_id, className)
    await addClassToStudent(studentMail, MSSV, classRoom, semester_id, semantic_class_id, subject_id, studentName, className);
    await addStudentToClass(semester_id, semantic_class_id, subject_id, className, studentMail, classRoom, MSSV, studentName);
    let mail = studentMail;
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
            newReport.semester_id = semester_id
            await newReport.save();
            return res.status(200).json({message:'success'});
        }
        return res.status(400).json({message:'Report existed'});
    })
}

const calculateM1 = async (generalReport, class_id) => {
    let myReports = await Report.find({class_id}).exec();
    let scoreAvg = 0;
    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangDuong;
    });
    generalReport.giangDuong.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangThietBi;
    });
    generalReport.trangThietBi.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hoTroKipThoi;
    });
    generalReport.hoTroKipThoi.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.mucTieuMonHoc;
    });
    generalReport.mucTieuMonHoc.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.thoiLuongMonHoc;
    });
    generalReport.thoiLuongMonHoc.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.taiLieu;
    });
    generalReport.taiLieu.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangBiKienThuc;
    });
    generalReport.trangBiKienThuc.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucHienDayDu;
    });
    generalReport.giangVienThucHienDayDu.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienHuongDanBatDauMonHoc;
    });
    generalReport.giangVienHuongDanBatDauMonHoc.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.phuongPhapGiangDay;
    });
    generalReport.phuongPhapGiangDay.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienTaoCoHoi;
    });
    generalReport.giangVienTaoCoHoi.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiupDocLap;
    });
    generalReport.giangVienGiupDocLap.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucTien;
    });
    generalReport.giangVienThucTien.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienSuDungCongCu;
    });
    generalReport.giangVienSuDungCongCu.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiaoDucTuCachNguoiHoc;
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hieuBai;
    });
    generalReport.hieuBai.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.cachDanhGia;
    });
    generalReport.cachDanhGia.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.noiDungDanhGia;
    });
    generalReport.noiDungDanhGia.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.tacDungThongTinPhanHoi;
    });
    generalReport.tacDungThongTinPhanHoi.M1 = scoreAvg*1.0/myReports.length;
    scoreAvg = 0;
}

const calculateSTD1 = async (generalReport, class_id) => {
    let myReports = await Report.find({class_id}).exec();
    let std1 = 0;
    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangDuong.M1 - element.giangDuong)*(generalReport.giangDuong.M1 - element.giangDuong);
    });
    generalReport.giangDuong.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.trangThietBi.M1 - element.trangThietBi)*(generalReport.trangThietBi.M1 - element.trangThietBi);
    });
    generalReport.trangThietBi.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.hoTroKipThoi.M1 - element.hoTroKipThoi)*(generalReport.hoTroKipThoi.M1 - element.hoTroKipThoi);
    });
    generalReport.hoTroKipThoi.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.mucTieuMonHoc.M1 - element.mucTieuMonHoc)*(generalReport.mucTieuMonHoc.M1 - element.mucTieuMonHoc);
    });
    generalReport.mucTieuMonHoc.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.thoiLuongMonHoc.M1 - element.thoiLuongMonHoc)*(generalReport.thoiLuongMonHoc.M1 - element.thoiLuongMonHoc);
    });
    generalReport.thoiLuongMonHoc.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.taiLieu.M1 - element.taiLieu)*(generalReport.taiLieu.M1 - element.taiLieu);
    });
    generalReport.taiLieu.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.trangBiKienThuc.M1 - element.trangBiKienThuc)*(generalReport.trangBiKienThuc.M1 - element.trangBiKienThuc);
    });
    generalReport.trangBiKienThuc.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangVienThucHienDayDu.M1 - element.giangVienThucHienDayDu)*(generalReport.giangVienThucHienDayDu.M1 - element.giangVienThucHienDayDu);
    });
    generalReport.giangVienThucHienDayDu.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangVienHuongDanBatDauMonHoc.M1 - element.giangVienHuongDanBatDauMonHoc)*(generalReport.giangVienHuongDanBatDauMonHoc.M1 - element.giangVienHuongDanBatDauMonHoc);
    });
    generalReport.giangVienHuongDanBatDauMonHoc.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.phuongPhapGiangDay.M1 - element.phuongPhapGiangDay)*(generalReport.phuongPhapGiangDay.M1 - element.phuongPhapGiangDay);
    });
    generalReport.phuongPhapGiangDay.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangVienTaoCoHoi.M1 - element.giangVienTaoCoHoi)*(generalReport.giangVienTaoCoHoi.M1 - element.giangVienTaoCoHoi);
    });
    generalReport.giangVienTaoCoHoi.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangVienGiupDocLap.M1 - element.giangVienGiupDocLap)*(generalReport.giangVienGiupDocLap.M1 - element.giangVienGiupDocLap);
    });
    generalReport.giangVienGiupDocLap.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangVienThucTien.M1 - element.giangVienThucTien)*(generalReport.giangVienThucTien.M1 - element.giangVienThucTien);
    });
    generalReport.giangVienThucTien.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangVienSuDungCongCu.M1 - element.giangVienSuDungCongCu)*(generalReport.giangVienSuDungCongCu.M1 - element.giangVienSuDungCongCu);
    });
    generalReport.giangVienSuDungCongCu.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.giangVienGiaoDucTuCachNguoiHoc.M1 - element.giangVienGiaoDucTuCachNguoiHoc)*(generalReport.giangVienGiaoDucTuCachNguoiHoc.M1 - element.giangVienGiaoDucTuCachNguoiHoc);
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.hieuBai.M1 - element.hieuBai)*(generalReport.hieuBai.M1 - element.hieuBai);
    });
    generalReport.hieuBai.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.cachDanhGia.M1 - element.cachDanhGia)*(generalReport.cachDanhGia.M1 - element.cachDanhGia);
    });
    generalReport.cachDanhGia.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.noiDungDanhGia.M1 - element.noiDungDanhGia)*(generalReport.noiDungDanhGia.M1 - element.noiDungDanhGia);
    });
    generalReport.noiDungDanhGia.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;

    myReports.forEach(element => {
        std1 = std1 + (generalReport.tacDungThongTinPhanHoi.M1 - element.tacDungThongTinPhanHoi)*(generalReport.tacDungThongTinPhanHoi.M1 - element.tacDungThongTinPhanHoi);
    });
    generalReport.tacDungThongTinPhanHoi.STD1 = Math.sqrt(std1*1.0/myReports.length);
    std1 = 0;
}

const generalReport = async (req, res) => {
    const {class_id} = req.body;
    let genReport = new GeneralReport();
    await calculateM1(genReport, class_id);
    await calculateSTD1(genReport, class_id);
    return res.status(200).json(genReport);
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
    createReport,
    generalReport};
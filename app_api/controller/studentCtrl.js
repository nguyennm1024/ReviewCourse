const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')

const allClass = async (req,res) => {
    const {_id} = req.body;
    if(!_id) return res.status(400).json({message: "Student ID is required"});
    let studentClass = await Student.findOne({_id}).populate('classRegistered').exec();
    if(!studentClass) return res.status(400).json({message: "Student not found"});
    let result = studentClass.classRegistered
    // return res.status(200).json(result);
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

const postReport = async (req,res) => {
    const {student_id, class_id, subject_id,giangDuong,trangThietBi,hoTroKipThoi,mucTieuMonHoc,thoiLuongMonHoc,taiLieu,trangBiKienThuc,giangVienThucHienDayDu,giangVienHuongDanBatDauMonHoc,phuongPhapGiangDay,giangVienTaoCoHoi,giangVienGiupDocLap,giangVienThucTien,giangVienSuDungCongCu,giangVienGiaoDucTuCachNguoiHoc,hieuBai,cachDanhGia,noiDungDanhGia,tacDungThongTinPhanHoi} = req.body;
    if(!student_id) return res.status(400).json({message:'Student ID is required'});
    if(!class_id) return res.status(400).json({message:'Class ID is required'});
    Report.findOne({student_id, class_id}, (err, studentReport) =>{
        if(err) return res.status(400).json({err});
        if(!studentReport) {
            studentReport = new Report();
            studentReport.student_id = student_id;
            studentReport.class_id = class_id;
            studentReport.subject_id = subject_id;
        }
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
        studentReport.save(e => {
            if(e) return res.status(400).json(e);

            return res.status(200).json({message: "success"});
        })
    })
} 
module.exports = {allClass,
    getReport,
    postReport};
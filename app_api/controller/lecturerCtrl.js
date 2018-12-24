const Admin = require('../model/admin')
const Student = require('../model/student')
const Lecturer = require('../model/lecturer')
const Class = require('../model/class')
const Report = require('../model/report')
const GeneralReport = require('../model/reportGeneral')
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

const calculateM1 = async (generalReport, class_id) => {
    let myReports = await Report.find({class_id}).exec();
    let scoreAvg = 0;
    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangDuong;
    });
    generalReport.giangDuong.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangThietBi;
    });
    generalReport.trangThietBi.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hoTroKipThoi;
    });
    generalReport.hoTroKipThoi.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.mucTieuMonHoc;
    });
    generalReport.mucTieuMonHoc.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.thoiLuongMonHoc;
    });
    generalReport.thoiLuongMonHoc.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.taiLieu;
    });
    generalReport.taiLieu.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangBiKienThuc;
    });
    generalReport.trangBiKienThuc.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucHienDayDu;
    });
    generalReport.giangVienThucHienDayDu.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienHuongDanBatDauMonHoc;
    });
    generalReport.giangVienHuongDanBatDauMonHoc.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.phuongPhapGiangDay;
    });
    generalReport.phuongPhapGiangDay.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienTaoCoHoi;
    });
    generalReport.giangVienTaoCoHoi.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiupDocLap;
    });
    generalReport.giangVienGiupDocLap.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucTien;
    });
    generalReport.giangVienThucTien.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienSuDungCongCu;
    });
    generalReport.giangVienSuDungCongCu.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiaoDucTuCachNguoiHoc;
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hieuBai;
    });
    generalReport.hieuBai.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.cachDanhGia;
    });
    generalReport.cachDanhGia.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.noiDungDanhGia;
    });
    generalReport.noiDungDanhGia.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.tacDungThongTinPhanHoi;
    });
    generalReport.tacDungThongTinPhanHoi.M1 = scoreAvg*1.0/completed;
    scoreAvg = 0;
}

const calculateSTD1 = async (generalReport, class_id) => {
    let myReports = await Report.find({class_id}).exec();
    let std1 = 0;
    let completed = 0;
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            completed++;
        }
    })
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            std1 = std1 + (generalReport.giangDuong.M1 - element.giangDuong)*(generalReport.giangDuong.M1 - element.giangDuong);
        }
    });
    generalReport.giangDuong.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.trangThietBi !==0) {
            std1 = std1 + (generalReport.trangThietBi.M1 - element.trangThietBi)*(generalReport.trangThietBi.M1 - element.trangThietBi);
        }
    });
    generalReport.trangThietBi.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.hoTroKipThoi !== 0) {
            std1 = std1 + (generalReport.hoTroKipThoi.M1 - element.hoTroKipThoi)*(generalReport.hoTroKipThoi.M1 - element.hoTroKipThoi);
        }
    });
    generalReport.hoTroKipThoi.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.mucTieuMonHoc !== 0) {
            std1 = std1 + (generalReport.mucTieuMonHoc.M1 - element.mucTieuMonHoc)*(generalReport.mucTieuMonHoc.M1 - element.mucTieuMonHoc);
        }
    });
    generalReport.mucTieuMonHoc.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.thoiLuongMonHoc) {
            std1 = std1 + (generalReport.thoiLuongMonHoc.M1 - element.thoiLuongMonHoc)*(generalReport.thoiLuongMonHoc.M1 - element.thoiLuongMonHoc);
        }
    });
    generalReport.thoiLuongMonHoc.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.taiLieu !== 0) {
            std1 = std1 + (generalReport.taiLieu.M1 - element.taiLieu)*(generalReport.taiLieu.M1 - element.taiLieu);
        }
    });
    generalReport.taiLieu.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.trangBiKienThuc !== 0) {
            std1 = std1 + (generalReport.trangBiKienThuc.M1 - element.trangBiKienThuc)*(generalReport.trangBiKienThuc.M1 - element.trangBiKienThuc);
        }
    });
    generalReport.trangBiKienThuc.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.giangVienThucHienDayDu !== 0) {
            std1 = std1 + (generalReport.giangVienThucHienDayDu.M1 - element.giangVienThucHienDayDu)*(generalReport.giangVienThucHienDayDu.M1 - element.giangVienThucHienDayDu);
        }
    });
    generalReport.giangVienThucHienDayDu.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.giangVienHuongDanBatDauMonHoc !== 0) {
            std1 = std1 + (generalReport.giangVienHuongDanBatDauMonHoc.M1 - element.giangVienHuongDanBatDauMonHoc)*(generalReport.giangVienHuongDanBatDauMonHoc.M1 - element.giangVienHuongDanBatDauMonHoc);
        }
    });
    generalReport.giangVienHuongDanBatDauMonHoc.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.phuongPhapGiangDay !== 0) {
            std1 = std1 + (generalReport.phuongPhapGiangDay.M1 - element.phuongPhapGiangDay)*(generalReport.phuongPhapGiangDay.M1 - element.phuongPhapGiangDay);
        }
    });
    generalReport.phuongPhapGiangDay.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.giangVienTaoCoHoi !== 0) {
            std1 = std1 + (generalReport.giangVienTaoCoHoi.M1 - element.giangVienTaoCoHoi)*(generalReport.giangVienTaoCoHoi.M1 - element.giangVienTaoCoHoi);
        }
    });
    generalReport.giangVienTaoCoHoi.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.giangVienGiupDocLap !== 0) {
            std1 = std1 + (generalReport.giangVienGiupDocLap.M1 - element.giangVienGiupDocLap)*(generalReport.giangVienGiupDocLap.M1 - element.giangVienGiupDocLap);
        }    
    });
    generalReport.giangVienGiupDocLap.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.giangVienThucTien !== 0) {
            std1 = std1 + (generalReport.giangVienThucTien.M1 - element.giangVienThucTien)*(generalReport.giangVienThucTien.M1 - element.giangVienThucTien);
        }
    });
    generalReport.giangVienThucTien.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.giangVienSuDungCongCu !== 0) {
            std1 = std1 + (generalReport.giangVienSuDungCongCu.M1 - element.giangVienSuDungCongCu)*(generalReport.giangVienSuDungCongCu.M1 - element.giangVienSuDungCongCu);
        }
    });
    generalReport.giangVienSuDungCongCu.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.giangVienGiaoDucTuCachNguoiHoc !== 0) {
        std1 = std1 + (generalReport.giangVienGiaoDucTuCachNguoiHoc.M1 - element.giangVienGiaoDucTuCachNguoiHoc)*(generalReport.giangVienGiaoDucTuCachNguoiHoc.M1 - element.giangVienGiaoDucTuCachNguoiHoc);
        }
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.hieuBai !== 0) {
            std1 = std1 + (generalReport.hieuBai.M1 - element.hieuBai)*(generalReport.hieuBai.M1 - element.hieuBai);
        }
    });
    generalReport.hieuBai.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.cachDanhGia !== 0) {
            std1 = std1 + (generalReport.cachDanhGia.M1 - element.cachDanhGia)*(generalReport.cachDanhGia.M1 - element.cachDanhGia);
        }    
    });
    generalReport.cachDanhGia.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.noiDungDanhGia !== 0) {
            std1 = std1 + (generalReport.noiDungDanhGia.M1 - element.noiDungDanhGia)*(generalReport.noiDungDanhGia.M1 - element.noiDungDanhGia);
        }    
    });
    generalReport.noiDungDanhGia.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;

    myReports.forEach(element => {
        if(element.tacDungThongTinPhanHoi !== 0) {
            std1 = std1 + (generalReport.tacDungThongTinPhanHoi.M1 - element.tacDungThongTinPhanHoi)*(generalReport.tacDungThongTinPhanHoi.M1 - element.tacDungThongTinPhanHoi);
        }
    });
    generalReport.tacDungThongTinPhanHoi.STD1 = Math.sqrt(std1*1.0/completed);
    std1 = 0;
}

const calculateM2 = async (generalReport, subject_id, semester_id) => {
    let myReports = await Report.find({subject_id, semester_id}).exec();
    let scoreAvg = 0;
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            completed++;
        }
    })
    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangDuong;
    });
    generalReport.giangDuong.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;
    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangThietBi;
    });
    generalReport.trangThietBi.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hoTroKipThoi;
    });
    generalReport.hoTroKipThoi.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.mucTieuMonHoc;
    });
    generalReport.mucTieuMonHoc.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.thoiLuongMonHoc;
    });
    generalReport.thoiLuongMonHoc.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.taiLieu;
    });
    generalReport.taiLieu.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangBiKienThuc;
    });
    generalReport.trangBiKienThuc.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucHienDayDu;
    });
    generalReport.giangVienThucHienDayDu.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienHuongDanBatDauMonHoc;
    });
    generalReport.giangVienHuongDanBatDauMonHoc.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.phuongPhapGiangDay;
    });
    generalReport.phuongPhapGiangDay.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienTaoCoHoi;
    });
    generalReport.giangVienTaoCoHoi.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiupDocLap;
    });
    generalReport.giangVienGiupDocLap.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucTien;
    });
    generalReport.giangVienThucTien.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienSuDungCongCu;
    });
    generalReport.giangVienSuDungCongCu.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiaoDucTuCachNguoiHoc;
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hieuBai;
    });
    generalReport.hieuBai.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.cachDanhGia;
    });
    generalReport.cachDanhGia.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.noiDungDanhGia;
    });
    generalReport.noiDungDanhGia.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.tacDungThongTinPhanHoi;
    });
    generalReport.tacDungThongTinPhanHoi.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

}

const calculateSTD2 = async (generalReport, subject_id, semester_id) => {
    let myReports = await Report.find({subject_id, semester_id}).exec();
    let std2 = 0;
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            completed++;
        }
    })
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            std2 = std2 + (generalReport.giangDuong.M2 - element.giangDuong)*(generalReport.giangDuong.M2 - element.giangDuong);
        }
    });
    generalReport.giangDuong.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.trangThietBi !==0) {
            std2 = std2 + (generalReport.trangThietBi.M2 - element.trangThietBi)*(generalReport.trangThietBi.M2 - element.trangThietBi);
        }
    });
    generalReport.trangThietBi.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.hoTroKipThoi !== 0) {
            std2 = std2 + (generalReport.hoTroKipThoi.M2 - element.hoTroKipThoi)*(generalReport.hoTroKipThoi.M2 - element.hoTroKipThoi);
        }
    });
    generalReport.hoTroKipThoi.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.mucTieuMonHoc !== 0) {
            std2 = std2 + (generalReport.mucTieuMonHoc.M2 - element.mucTieuMonHoc)*(generalReport.mucTieuMonHoc.M2 - element.mucTieuMonHoc);
        }
    });
    generalReport.mucTieuMonHoc.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.thoiLuongMonHoc) {
            std2 = std2 + (generalReport.thoiLuongMonHoc.M2 - element.thoiLuongMonHoc)*(generalReport.thoiLuongMonHoc.M2 - element.thoiLuongMonHoc);
        }
    });
    generalReport.thoiLuongMonHoc.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.taiLieu !== 0) {
            std2 = std2 + (generalReport.taiLieu.M2 - element.taiLieu)*(generalReport.taiLieu.M2 - element.taiLieu);
        }
    });
    generalReport.taiLieu.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.trangBiKienThuc !== 0) {
            std2 = std2 + (generalReport.trangBiKienThuc.M2 - element.trangBiKienThuc)*(generalReport.trangBiKienThuc.M2 - element.trangBiKienThuc);
        }
    });
    generalReport.trangBiKienThuc.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.giangVienThucHienDayDu !== 0) {
            std2 = std2 + (generalReport.giangVienThucHienDayDu.M2 - element.giangVienThucHienDayDu)*(generalReport.giangVienThucHienDayDu.M2 - element.giangVienThucHienDayDu);
        }
    });
    generalReport.giangVienThucHienDayDu.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.giangVienHuongDanBatDauMonHoc !== 0) {
            std2 = std2 + (generalReport.giangVienHuongDanBatDauMonHoc.M2 - element.giangVienHuongDanBatDauMonHoc)*(generalReport.giangVienHuongDanBatDauMonHoc.M2 - element.giangVienHuongDanBatDauMonHoc);
        }
    });
    generalReport.giangVienHuongDanBatDauMonHoc.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.phuongPhapGiangDay !== 0) {
            std2 = std2 + (generalReport.phuongPhapGiangDay.M2 - element.phuongPhapGiangDay)*(generalReport.phuongPhapGiangDay.M2 - element.phuongPhapGiangDay);
        }
    });
    generalReport.phuongPhapGiangDay.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.giangVienTaoCoHoi !== 0) {
            std2 = std2 + (generalReport.giangVienTaoCoHoi.M2 - element.giangVienTaoCoHoi)*(generalReport.giangVienTaoCoHoi.M2 - element.giangVienTaoCoHoi);
        }
    });
    generalReport.giangVienTaoCoHoi.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.giangVienGiupDocLap !== 0) {
            std2 = std2 + (generalReport.giangVienGiupDocLap.M2 - element.giangVienGiupDocLap)*(generalReport.giangVienGiupDocLap.M2 - element.giangVienGiupDocLap);
        }    
    });
    generalReport.giangVienGiupDocLap.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.giangVienThucTien !== 0) {
            std2 = std2 + (generalReport.giangVienThucTien.M2 - element.giangVienThucTien)*(generalReport.giangVienThucTien.M2 - element.giangVienThucTien);
        }
    });
    generalReport.giangVienThucTien.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.giangVienSuDungCongCu !== 0) {
            std2 = std2 + (generalReport.giangVienSuDungCongCu.M2 - element.giangVienSuDungCongCu)*(generalReport.giangVienSuDungCongCu.M2 - element.giangVienSuDungCongCu);
        }
    });
    generalReport.giangVienSuDungCongCu.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.giangVienGiaoDucTuCachNguoiHoc !== 0) {
        std2 = std2 + (generalReport.giangVienGiaoDucTuCachNguoiHoc.M2 - element.giangVienGiaoDucTuCachNguoiHoc)*(generalReport.giangVienGiaoDucTuCachNguoiHoc.M2 - element.giangVienGiaoDucTuCachNguoiHoc);
        }
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.hieuBai !== 0) {
            std2 = std2 + (generalReport.hieuBai.M2 - element.hieuBai)*(generalReport.hieuBai.M2 - element.hieuBai);
        }
    });
    generalReport.hieuBai.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.cachDanhGia !== 0) {
            std2 = std2 + (generalReport.cachDanhGia.M2 - element.cachDanhGia)*(generalReport.cachDanhGia.M2 - element.cachDanhGia);
        }    
    });
    generalReport.cachDanhGia.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.noiDungDanhGia !== 0) {
            std2 = std2 + (generalReport.noiDungDanhGia.M2 - element.noiDungDanhGia)*(generalReport.noiDungDanhGia.M2 - element.noiDungDanhGia);
        }    
    });
    generalReport.noiDungDanhGia.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;

    myReports.forEach(element => {
        if(element.tacDungThongTinPhanHoi !== 0) {
            std2 = std2 + (generalReport.tacDungThongTinPhanHoi.M2 - element.tacDungThongTinPhanHoi)*(generalReport.tacDungThongTinPhanHoi.M2 - element.tacDungThongTinPhanHoi);
        }
    });
    generalReport.tacDungThongTinPhanHoi.STD2 = Math.sqrt(std2*1.0/completed);
    std2 = 0;
}

const calculateM3 = async (generalReport, lecturerName, semester_id) => {
    let myReports = await Report.find({lecturerName, semester_id}).exec();
    let scoreAvg = 0;
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            completed++;
        }
    })
    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangDuong;
    });
    generalReport.giangDuong.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;
    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangThietBi;
    });
    generalReport.trangThietBi.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hoTroKipThoi;
    });
    generalReport.hoTroKipThoi.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.mucTieuMonHoc;
    });
    generalReport.mucTieuMonHoc.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.thoiLuongMonHoc;
    });
    generalReport.thoiLuongMonHoc.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.taiLieu;
    });
    generalReport.taiLieu.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.trangBiKienThuc;
    });
    generalReport.trangBiKienThuc.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucHienDayDu;
    });
    generalReport.giangVienThucHienDayDu.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienHuongDanBatDauMonHoc;
    });
    generalReport.giangVienHuongDanBatDauMonHoc.M2 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.phuongPhapGiangDay;
    });
    generalReport.phuongPhapGiangDay.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienTaoCoHoi;
    });
    generalReport.giangVienTaoCoHoi.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiupDocLap;
    });
    generalReport.giangVienGiupDocLap.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienThucTien;
    });
    generalReport.giangVienThucTien.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienSuDungCongCu;
    });
    generalReport.giangVienSuDungCongCu.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.giangVienGiaoDucTuCachNguoiHoc;
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.hieuBai;
    });
    generalReport.hieuBai.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.cachDanhGia;
    });
    generalReport.cachDanhGia.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.noiDungDanhGia;
    });
    generalReport.noiDungDanhGia.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

    myReports.forEach(element => {
        scoreAvg = scoreAvg + element.tacDungThongTinPhanHoi;
    });
    generalReport.tacDungThongTinPhanHoi.M3 = scoreAvg*1.0/completed;
    scoreAvg = 0;

}

const calculateSTD3 = async (generalReport, class_id) => {
    let myReports = await Report.find({class_id}).exec();
    let std3 = 0;
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            completed++;
        }
    })
    myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            std3 = std3 + (generalReport.giangDuong.M3 - element.giangDuong)*(generalReport.giangDuong.M3 - element.giangDuong);
        }
    });
    generalReport.giangDuong.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.trangThietBi !==0) {
            std3 = std3 + (generalReport.trangThietBi.M3 - element.trangThietBi)*(generalReport.trangThietBi.M3 - element.trangThietBi);
        }
    });
    generalReport.trangThietBi.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.hoTroKipThoi !== 0) {
            std3 = std3 + (generalReport.hoTroKipThoi.M3 - element.hoTroKipThoi)*(generalReport.hoTroKipThoi.M3 - element.hoTroKipThoi);
        }
    });
    generalReport.hoTroKipThoi.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.mucTieuMonHoc !== 0) {
            std3 = std3 + (generalReport.mucTieuMonHoc.M3 - element.mucTieuMonHoc)*(generalReport.mucTieuMonHoc.M3 - element.mucTieuMonHoc);
        }
    });
    generalReport.mucTieuMonHoc.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.thoiLuongMonHoc) {
            std3 = std3 + (generalReport.thoiLuongMonHoc.M3 - element.thoiLuongMonHoc)*(generalReport.thoiLuongMonHoc.M3 - element.thoiLuongMonHoc);
        }
    });
    generalReport.thoiLuongMonHoc.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.taiLieu !== 0) {
            std3 = std3 + (generalReport.taiLieu.M3 - element.taiLieu)*(generalReport.taiLieu.M3 - element.taiLieu);
        }
    });
    generalReport.taiLieu.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.trangBiKienThuc !== 0) {
            std3 = std3 + (generalReport.trangBiKienThuc.M3 - element.trangBiKienThuc)*(generalReport.trangBiKienThuc.M3 - element.trangBiKienThuc);
        }
    });
    generalReport.trangBiKienThuc.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.giangVienThucHienDayDu !== 0) {
            std3 = std3 + (generalReport.giangVienThucHienDayDu.M3 - element.giangVienThucHienDayDu)*(generalReport.giangVienThucHienDayDu.M3 - element.giangVienThucHienDayDu);
        }
    });
    generalReport.giangVienThucHienDayDu.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.giangVienHuongDanBatDauMonHoc !== 0) {
            std3 = std3 + (generalReport.giangVienHuongDanBatDauMonHoc.M3 - element.giangVienHuongDanBatDauMonHoc)*(generalReport.giangVienHuongDanBatDauMonHoc.M3 - element.giangVienHuongDanBatDauMonHoc);
        }
    });
    generalReport.giangVienHuongDanBatDauMonHoc.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.phuongPhapGiangDay !== 0) {
            std3 = std3 + (generalReport.phuongPhapGiangDay.M3 - element.phuongPhapGiangDay)*(generalReport.phuongPhapGiangDay.M3 - element.phuongPhapGiangDay);
        }
    });
    generalReport.phuongPhapGiangDay.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.giangVienTaoCoHoi !== 0) {
            std3 = std3 + (generalReport.giangVienTaoCoHoi.M3 - element.giangVienTaoCoHoi)*(generalReport.giangVienTaoCoHoi.M3 - element.giangVienTaoCoHoi);
        }
    });
    generalReport.giangVienTaoCoHoi.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.giangVienGiupDocLap !== 0) {
            std3 = std3 + (generalReport.giangVienGiupDocLap.M3 - element.giangVienGiupDocLap)*(generalReport.giangVienGiupDocLap.M3 - element.giangVienGiupDocLap);
        }    
    });
    generalReport.giangVienGiupDocLap.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.giangVienThucTien !== 0) {
            std3 = std3 + (generalReport.giangVienThucTien.M3 - element.giangVienThucTien)*(generalReport.giangVienThucTien.M3 - element.giangVienThucTien);
        }
    });
    generalReport.giangVienThucTien.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.giangVienSuDungCongCu !== 0) {
            std3 = std3 + (generalReport.giangVienSuDungCongCu.M3 - element.giangVienSuDungCongCu)*(generalReport.giangVienSuDungCongCu.M3 - element.giangVienSuDungCongCu);
        }
    });
    generalReport.giangVienSuDungCongCu.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.giangVienGiaoDucTuCachNguoiHoc !== 0) {
        std3 = std3 + (generalReport.giangVienGiaoDucTuCachNguoiHoc.M3 - element.giangVienGiaoDucTuCachNguoiHoc)*(generalReport.giangVienGiaoDucTuCachNguoiHoc.M3 - element.giangVienGiaoDucTuCachNguoiHoc);
        }
    });
    generalReport.giangVienGiaoDucTuCachNguoiHoc.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.hieuBai !== 0) {
            std3 = std3 + (generalReport.hieuBai.M3 - element.hieuBai)*(generalReport.hieuBai.M3 - element.hieuBai);
        }
    });
    generalReport.hieuBai.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.cachDanhGia !== 0) {
            std3 = std3 + (generalReport.cachDanhGia.M3 - element.cachDanhGia)*(generalReport.cachDanhGia.M3 - element.cachDanhGia);
        }    
    });
    generalReport.cachDanhGia.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.noiDungDanhGia !== 0) {
            std3 = std3 + (generalReport.noiDungDanhGia.M3 - element.noiDungDanhGia)*(generalReport.noiDungDanhGia.M3 - element.noiDungDanhGia);
        }    
    });
    generalReport.noiDungDanhGia.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;

    myReports.forEach(element => {
        if(element.tacDungThongTinPhanHoi !== 0) {
            std3 = std3 + (generalReport.tacDungThongTinPhanHoi.M3 - element.tacDungThongTinPhanHoi)*(generalReport.tacDungThongTinPhanHoi.M3 - element.tacDungThongTinPhanHoi);
        }
    });
    generalReport.tacDungThongTinPhanHoi.STD3 = Math.sqrt(std3*1.0/completed);
    std3 = 0;
}
const generalReport = async (req, res) => {
    const {class_id, subject_id, semester_id, lecturerName} = req.body;
    let genReport = new GeneralReport();
    let myReports = await Report.find({class_id}).exec();
    let completed = 0;
    await myReports.forEach(element => {
        if(element.giangDuong !== 0) {
            completed++;
        }
    })
    await calculateM1(genReport, class_id);
    await calculateSTD1(genReport, class_id);
    await calculateM2(genReport, subject_id, semester_id);
    await calculateSTD2(genReport, subject_id, semester_id);
    await calculateM3(genReport, lecturerName, semester_id);
    await calculateSTD3(genReport, lecturerName, semester_id);
    return res.status(200).json({"genReport": genReport, "completed": completed});
}
module.exports = {allClass, studentInClass, generalReport};
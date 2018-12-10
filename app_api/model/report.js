const name = 'report';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
    student_id: {type:Schema.Types.ObjectId, ref:'student'},
    class_id: {type: Schema.Types.ObjectId, ref: 'class'},
    subject_id:{type: String, required: true},
    semester_id:{type: String, required: true},
    //lecturerMail:{type: String, required: true},
    giangDuong: {type: Number, default: 0},
    trangThietBi: {type: Number, default: 0},
    hoTroKipThoi:{type: Number, default:0},
    mucTieuMonHoc:{type:Number, default: 0},
    thoiLuongMonHoc:{type:Number, default: 0},
    taiLieu:{type: Number, default: 0},
    trangBiKienThuc:{type: Number, default: 0},
    giangVienThucHienDayDu:{type: Number, default: 0},
    giangVienHuongDanBatDauMonHoc:{type: Number, default: 0},
    phuongPhapGiangDay: {type: Number, default: 0},
    giangVienTaoCoHoi: {type: Number, default: 0},
    giangVienGiupDocLap: {type: Number, default: 0},
    giangVienThucTien:{type:Number, default:0},
    giangVienSuDungCongCu: {type: Number, default: 0},
    giangVienGiaoDucTuCachNguoiHoc:{type:Number, default: 0},
    hieuBai:{type: Number, default:0},
    cachDanhGia:{type: Number, default: 0},
    noiDungDanhGia:{type: Number, default: 0},
    tacDungThongTinPhanHoi:{type: Number, default: 0}
});

module.exports = mongoose.model(name, reportSchema);
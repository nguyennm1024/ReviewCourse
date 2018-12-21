const name = 'reportGeneral';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportGeneralSchema = new Schema({
    giangDuong: {
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    trangThietBi: {
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    hoTroKipThoi:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    mucTieuMonHoc:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    thoiLuongMonHoc:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    taiLieu:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    trangBiKienThuc:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    giangVienThucHienDayDu:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    giangVienHuongDanBatDauMonHoc:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    phuongPhapGiangDay: {
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    giangVienTaoCoHoi: {
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    giangVienGiupDocLap: {
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    giangVienThucTien:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    giangVienSuDungCongCu: {
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    giangVienGiaoDucTuCachNguoiHoc:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    hieuBai:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    cachDanhGia:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    noiDungDanhGia:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    },
    tacDungThongTinPhanHoi:{
        M1:{type:Number, default: 0},
        STD1:{type:Number, default:0},
        M2:{type:Number, default:0},
        STD2:{type:Number, default:0},
        M3:{type: Number, default:0},
        STD3:{type:Number, default: 0}
    }
});

module.exports = mongoose.model(name, reportGeneralSchema);
import React, { Component } from 'react';
import { KeyValue } from './KeyValueSurvey';

const result = {
    M1: null,
    STD1: null,
    M2: null,
    STD2: null,
    M3: null,
    STD3: null,
}

class SurveyResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giangDuong: result,
            trangThietBi: result,
            hoTroKipThoi: result,
            mucTieuMonHoc: result,
            thoiLuongMonHoc: result,
            taiLieu: result,
            trangBiKienThuc: result,
            giangVienThucHienDayDu: result,
            giangVienHuongDanBatDauMonHoc: result,
            phuongPhapGiangDay: result,
            giangVienTaoCoHoi: result,
            giangVienGiupDocLap: result,
            giangVienThucTien: result,
            giangVienSuDungCongCu: result,
            giangVienGiaoDucTuCachNguoiHoc: result,
            hieuBai: result,
            cachDanhGia: result,
            noiDungDanhGia: result,
            tacDungThongTinPhanHoi: result,
        };
    }

    render() {
        let listSurveys = Object.getOwnPropertyNames(this.state).map((survey, index) => 
            <tr key={survey}>
                <td>{index + 1}</td>
                <td>{KeyValue[survey]}</td>
                <td>{survey.M1}</td>
                <td>{survey.STD1}</td>
                <td>{survey.M2}</td>
                <td>{survey.STD2}</td>
                <td>{survey.M3}</td>
                <td>{survey.STD3}</td>
            </tr>
        );
        // console.log(listSurveys);
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div  className="panel-heading">
                            <h3 className="text-center">KẾT QUẢ PHẢN HỒI CỦA NGƯỜI HỌC VỀ HỌC PHẦN</h3>
                            <p className="text-center">Học kì I, Năm học: 2017-2018</p>
                            <p>Tên học phần: INT3306 1</p>
                            <p>Tên giảng viên: Lê Đình Thanh</p>
                            <p>Số lượng sinh viên đánh giá: 100</p>
                            <p>Số lượng giảng viên tham gia dạy môn học Phát triển ứng dụng Web INT3306: 1</p>
                            <p>Số lượng môn học giảng viên tham gia giảng dạy: 1</p>
                        </div>

                        <div className="panel-body">
                            <table width="100%" className="table table-striped table-bordered table-hover">
                                {headerTable}
                                <tbody>
                                    {listSurveys}
                                </tbody>
                            </table>
                        </div>

                        <div className="panel-footer">
                            <p>Ghi chú:</p>
                            <ul>
                                <li>M1: giá trị trung bình của các tiêu chí theo lớp học phần</li>
                                <li>STD1: độ lệch chuẩn của các tiêu chí theo lớp học phần</li>
                                <li>M2: giá trị trung bình của các tiêu chí dựa trên dữ liệu phản hồi của sinh viên cho các giảng viên dạy cùng môn học với thầy/cô</li>
                                <li>STD2: độ lệch chuẩn của các tiêu chí dựa trên ý kiến phản hồi của sinh viên cho các giảng viên dạy cùng môn học với thầy/cô</li>
                                <li>M3: giá trị trung bình của các tiêu chí dựa trên ý kiến phản hồi của sinh viên về các môn học mà thầy/cô đã thực hiện giảng dạy</li>
                                <li>STD3: độ lệch chuẩn của các tiêu chí dựa trên ý kiến phản hồi của sinh viên về các môn học mà thầy/cô đã thực hiện giảng dạy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const headerTable = (
    <thead>
        <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tiêu chí</th>
            <th className="text-center">M1</th>
            <th className="text-center">STD1</th>
            <th className="text-center">M2</th>
            <th className="text-center">STD2</th>
            <th className="text-center">M3</th>
            <th className="text-center">STD3</th>
        </tr>
    </thead>
);

export default SurveyResult;
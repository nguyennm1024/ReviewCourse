import React, { Component } from 'react';
import { KeyValue } from './KeyValueSurvey';

const result = {
    M1: 0,
    STD1: 0,
    M2: 0,
    STD2: 0,
    M3: 0,
    STD3: 0,
}

class SurveyResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
                completed: 0,
                genReport: {
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
            }
        };
    }

    async componentDidMount() {
        const API_surveyResult = `http://localhost:5000/api/${localStorage.getItem('role')}/generalReport`;
        console.log(JSON.stringify({
            'class_id': this.props.class_id,
            'subject_id': this.props.subject_id,
            'semester_id': this.props.semester_id,
            'lecturerName': localStorage.getItem('role') === 'admin'
                ? localStorage.getItem('teacherName')
                : localStorage.getItem('userName')
        }));
        let token = localStorage.getItem('id_token');
        await fetch(API_surveyResult, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'class_id': this.props.class_id,
                'subject_id': this.props.subject_id,
                'semester_id': this.props.semester_id,
                'lecturerName': localStorage.getItem('role') === 'admin'
                    ? localStorage.getItem('teacherName')
                    : localStorage.getItem('userName')
            })
        })
            .then(response => response.json())
            .then(response => {
                delete response.genReport._id;
                this.setState(response);
                console.log(response);
            })
            .catch(err => console.log("Loi:" + err));
    }
    render() {
        let listSurveys = Object.getOwnPropertyNames(this.state.genReport).map((survey, index) => 
            <tr key={survey}>
                <td>{index + 1}</td>
                <td>{KeyValue[survey]}</td>
                <td>{this.state.genReport[survey].M1.toFixed(2)}</td>
                <td>{this.state.genReport[survey].STD1.toFixed(2)}</td>
                <td>{this.state.genReport[survey].M2.toFixed(2)}</td>
                <td>{this.state.genReport[survey].STD2.toFixed(2)}</td>
                <td>{this.state.genReport[survey].M3.toFixed(2)}</td>
                <td>{this.state.genReport[survey].STD3.toFixed(2)}</td>
            </tr>
        );
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
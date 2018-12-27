import React, { Component } from 'react';
import { KeyValue } from './KeyValueSurvey';

const API_postReport = "http://localhost:5000/api/student/postReport";

const headerTable = (
    <thead>
        <tr>
            <th className="col-lg-9"></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
        </tr>
    </thead>
);

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: this.props.student_id,
            class_id: this.props._id,
            subject_id: "",
            className: "",
            disabled: localStorage.getItem('role') === 'admin' ? true : false,
            sendSuccess: false,
            dataReport: {
                giangDuong: null,
                trangThietBi: null,
                hoTroKipThoi: null,
                mucTieuMonHoc: null,
                thoiLuongMonHoc: null,
                taiLieu: null,
                trangBiKienThuc: null,
                giangVienThucHienDayDu: null,
                giangVienHuongDanBatDauMonHoc: null,
                phuongPhapGiangDay: null,
                giangVienTaoCoHoi: null,
                giangVienGiupDocLap: null,
                giangVienThucTien: null,
                giangVienSuDungCongCu: null,
                giangVienGiaoDucTuCachNguoiHoc: null,
                hieuBai: null,
                cachDanhGia: null,
                noiDungDanhGia: null,
                tacDungThongTinPhanHoi: null,
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.postReport = this.postReport.bind(this);
    }


    async componentWillMount() {
        const API_getStudentReport = `http://localhost:5000/api/${localStorage.getItem('role')}/getReport`;
        let token = localStorage.getItem("id_token");
        await fetch(API_getStudentReport, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'student_id': this.props.student_id,
                'class_id': this.props._id
            })
        })
            .then(response => response.json())
            .then(response => {
                delete response.class_id;
                delete response.semester_id;
                delete response.student_id;
                delete response.subject_id;
                delete response.__v;
                delete response._id;
                delete response.lecturerName;
                this.setState({ dataReport: response });
            })
            .catch(err => console.log("Loi" + err));
    }

    handleChange(event) {
        this.setState({ sendSuccess: false });
        let target = event.target;
        let value = target.value;
        let name = target.name;
        let data = Object.assign({}, this.state.dataReport);
        data[name] = parseInt(value);
        console.log(data);
        this.setState({
            dataReport: data
        });
    }

    async postReport() {
        console.log(this.state.dataReport);
        let token = localStorage.getItem('id_token');
        await fetch(API_postReport, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'student_id': this.props.student_id,
                'class_id': this.props._id,
                // 'subject_id': 
                ...this.state.dataReport
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ sendSuccess: true });
            })
            .catch(err => console.log("Loi:" + err));
    }

    render() {
        let listSurveys = Object.getOwnPropertyNames(this.state.dataReport).map(survey =>
            <tr key={survey}>
                <td className="td-name">{KeyValue[survey]}</td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={1}
                        onChange={this.handleChange}
                        checked={this.state.dataReport[survey] === 1}
                        disabled={this.state.disabled}
                        style={{cursor: "pointer"}}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={2}
                        onChange={this.handleChange}
                        checked={this.state.dataReport[survey] === 2}
                        disabled={this.state.disabled}
                        style={{cursor: "pointer"}}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={3}
                        onChange={this.handleChange}
                        checked={this.state.dataReport[survey] === 3}
                        disabled={this.state.disabled}
                        style={{cursor: "pointer"}}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={4}
                        onChange={this.handleChange}
                        checked={this.state.dataReport[survey] === 4}
                        disabled={this.state.disabled}
                        style={{cursor: "pointer"}}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={5}
                        onChange={this.handleChange}
                        checked={this.state.dataReport[survey] === 5}
                        disabled={this.state.disabled}
                        style={{cursor: "pointer"}}
                    />
                </td>
            </tr>
        );
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <GroupSurvey
                                groupName="1.* Cơ sở vật chất"
                                listGroup={listSurveys.slice(0, 2)}
                            />

                            <GroupSurvey
                                groupName="2.* Môn học"
                                listGroup={listSurveys.slice(2, 7)}
                            />

                            <GroupSurvey
                                groupName="3.* Hoạt động giảng dạy của giảng viên"
                                listGroup={listSurveys.slice(7)}
                            />
                        </div>

                        {
                            localStorage.getItem('role') === 'student'
                            ? <div className="panel-footer text-center">
                                {this.state.sendSuccess ? <div className="alert alert-success">Bạn đã đánh giá thành công</div>
                                : <button 
                                className="btn btn-default"
                                onClick={this.postReport}
                            >
                                Gửi đánh giá
                            </button>    
                            }
                            </div>
                            : <div />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const GroupSurvey = (props) =>
    <div>
        <p>{props.groupName}</p>
        <table className="table">
            {headerTable}
            <tbody>
                {props.listGroup}
            </tbody>
        </table>
    </div>
    
export default Reports;
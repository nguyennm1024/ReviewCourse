import React, { Component } from 'react';
import { KeyValue } from './KeyValueSurvey';

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
            disabled: this.props.role === 'admin' ? true : false,
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
    }


    async componentDidMount() {
        const API_getStudentReport = `http://localhost:5000/api/${this.props.role}/getReport`;
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
                console.log(response);
                delete response.class_id;
                delete response.semester_id;
                delete response.student_id;
                delete response.subject_id;
                delete response.__v;
                delete response._id;
                this.setState({ dataReport: response });
            })
            .catch(err => console.log("Loi" + err));
    }

    handleChange(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        let listSurveys = Object.getOwnPropertyNames(this.state.dataReport).map(survey =>
            <tr key={survey}>
                <td>{KeyValue[survey]}</td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={1}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "1"}
                        disabled={this.state.disabled}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={2}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "2"}
                        disabled={this.state.disabled}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={3}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "3"}
                        disabled={this.state.disabled}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={4}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "4"}
                        disabled={this.state.disabled}
                    />
                </td>
                <td>
                    <input
                        type="radio"
                        name={survey}
                        value={5}
                        onChange={this.handleChange}
                        checked={this.state[survey] === "5"}
                        disabled={this.state.disabled}
                    />
                </td>
            </tr>
        );
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading text-center">
                            <h4>Toán rời rạc INT1003 1</h4>
                        </div>

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
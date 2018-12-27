import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Reports from './Reports';
import Modal from './Modal';

const API_setReportToDefault = "http://localhost:5000/api/admin/setReportToDefault";

class ClassInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: this.props.className,
            semester_id: 1,
            teacherName: "",
            classId: "",
            listStudent: [],
            firstToggle: false,
            secondToggle: false,
            studentSelected: null,
            resetSuccess: false,
        }
        this.firstToggle = this.firstToggle.bind(this);
        this.secondToggle = this.secondToggle.bind(this);
        this.setReportToDefault = this.setReportToDefault.bind(this);
    }

    firstToggle() {
        this.setState({ firstToggle: !this.state.firstToggle });
    }

    secondToggle() {
        this.setState({ secondToggle: !this.state.secondToggle });
    }

    async setReportToDefault() {
        let token = localStorage.getItem('id_token');
        await fetch(API_setReportToDefault, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'student_id': this.state.studentSelected,
                'class_id': this.props._id
            })
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ resetSuccess: true });
                this.secondToggle();
                this.firstToggle();
            })
            .catch(err => console.log("Loi" + err));
    }

    componentDidMount() {
        const API_classInfo = `http://localhost:5000/api/${localStorage.getItem('role')}/studentInClass`;
        let token = localStorage.getItem('id_token');
        fetch(API_classInfo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ '_id': this.props._id })
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    semester_id: localStorage.getItem('role') === 'admin' 
                        ? response.lecturer.semester_id
                        : 1,
                    classId: response.semantic_class_id,
                    teacherName: localStorage.getItem('role') === 'admin' 
                        ? response.lecturer.lecturerName
                        : response.lecturerName,
                    listStudent: response.listStudent.map(student => ({
                        MSSV: student.MSSV,
                        birth: student.birth.toLocaleString(),
                        classRoom: student.classRoom,
                        name: student.studentName,
                        _id: student._id
                    }))
                })
                localStorage.setItem('teacherName', this.state.teacherName);
            })
            .catch(error => console.log('Loi', error));
    }

    render() {
        let listStudents;
        switch (localStorage.getItem('role')) {
            case 'admin':
                listStudents = this.state.listStudent.map((student, index) =>
                    <tr key={student.MSSV}>
                        <td>{index + 1}</td>
                        <td>{student.MSSV}</td>
                        <td className="td-name">{student.name}</td>
                        <td>{student.birth}</td>
                        <td>{student.classRoom}</td>
                        <td>
                            <button
                                className="btn btn-secondary"
                                onClick={ () => this.setState({
                                    firstToggle: !this.state.firstToggle,
                                    studentSelected: student._id
                                })}
                            >
                                Đánh giá
                            </button>
                        </td>
                    </tr>
                );
                break;
            case 'lecturer':
                listStudents = this.state.listStudent.map((student, index) =>
                    <tr key={student.MSSV}>
                        <td>{index + 1}</td>
                        <td>{student.MSSV}</td>
                        <td className="td-name">{student.name}</td>
                        <td>{student.birth}</td>
                        <td>{student.classRoom}</td>
                    </tr>
                );
                break;
                default: break;
        };

        return (
            <div className={this.state.firstToggle ? "modal-open" : ""}>
                <div className="row">
                    <div className="col-lg-12 page-header">
                        <h3>{this.state.className} {this.state.classId}</h3><br />
                        Năm học: {this.state.semester_id + 2016} - {this.state.semester_id + 2017}<br />
                        {localStorage.getItem('role') === 'admin' ? <p>Giảng viên: {this.state.teacherName}<br /></p> : ""}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <table width="100%" className="table table-striped table-bordered table-hover">
                                    <HeaderTable />
                                    <tbody>
                                        {listStudents}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <Link to={"/surveyResult" + this.props.classId.replace(/\s/g, '')}>
                                    <button className="btn btn-secondary">Kết quả khảo sát</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.firstToggle ? <Modal
                    component_1={<Reports 
                        _id={this.props._id}
                        student_id={this.state.studentSelected}
                        className={this.state.className}
                    />}
                    component_2={<Modal 
                        component_1={<p className="text-center">Xác nhận đặt lại mặc định</p>}
                        size="modal-sm"
                        changeToggle={this.secondToggle}
                        action_1={this.secondToggle}
                        actionName_1="Hủy"
                        action_2={this.setReportToDefault}
                        actionName_2="Xác nhận"
                        title="Chú ý"
                    />}
                    size="modal-lg"
                    changeToggle={this.firstToggle}
                    action_1={this.firstToggle}
                    actionName_1="OK"
                    action_2={this.secondToggle}
                    secondToggle={this.state.secondToggle}
                    actionName_2="Đặt mặc định"
                    title={this.state.className}
                    /> : <div />
                }
            </div>
        );
    }
}

const HeaderTable = () => {
    switch (localStorage.getItem('role')) {
        case 'admin': return (
            <thead>
                <tr>
                    <th>STT</th>
                    <th>MSSV</th>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Lớp khóa học</th>
                    <th>Phiếu</th>
                </tr>
            </thead>
        );
        case 'lecturer': return (
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã SV</th>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Lớp khóa học</th>
                </tr>
            </thead>
        );
        default: break;
    }
}
export default ClassInfo;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Reports from './Reports';
import Modal from './Modal';

class ClassInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "",
            semester_id: null,
            classId: "",
            listStudent: [],
            toggle: false,
            studentSelected: null,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ toggle: !this.state.toggle });
    }

    componentDidMount() {
        const API_classInfo = `http://localhost:5000/api/${this.props.role}/studentInClass`;
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
                console.log(response);
                this.setState({
                    className: response.className,
                    semester_id: response.semester_id,
                    classId: response.semantic_class_id,
                    listStudent: response.listStudent.map(student => ({
                        MSSV: student.MSSV,
                        birth: student.birth.toLocaleString(),
                        classRoom: student.classRoom,
                        name: student.studentName,
                        _id: student._id
                    }))
                })
                // console.log(this.state);
            })
            .catch(error => console.log('Loi', error));
    }

    render() {
        let listStudents;
        switch (this.props.role) {
            case 'admin':
                listStudents = this.state.listStudent.map((student, index) =>
                    <tr key={student.MSSV}>
                        <td>{index + 1}</td>
                        <td>{student.MSSV}</td>
                        <td>{student.name}</td>
                        <td>{student.birth}</td>
                        <td>{student.classRoom}</td>
                        <td>
                            <button
                                className="btn btn-secondary"
                                onClick={ () => this.setState({
                                    toggle: !this.state.toggle,
                                    studentSelected: student._id
                                })}
                            >
                                Phiếu
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
                        <td>{student.name}</td>
                        <td>{student.birth}</td>
                        <td>{student.classRoom}</td>
                    </tr>
                );
                break;
        };

        return (
            <div className={this.state.toggle ? "modal-open" : ""}>
                <div className="row">
                    <div className="col-lg-12 page-header">
                        <h3>{this.state.className} {this.state.classId}</h3><br />
                        Năm học: {this.state.semester_id}<br />
                        Giảng viên: {this.state.teacherName}<br />
                        {/* Lớp môn học:  */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <table width="100%" className="table table-striped table-bordered table-hover">
                                    <HeaderTable role={this.props.role} />
                                    <tbody>
                                        {listStudents}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <Link to="/surveyResult">
                                    <button className="btn btn-secondary">Kết quả khảo sát</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.toggle ? <Modal 
                    changeToggle={this.toggle} 
                    _id={this.props._id}
                    student_id={this.state.studentSelected}
                    role={this.props.role}
                /> 
                    : <div></div>
                }
            </div>
        );
    }
}

const HeaderTable = (props) => {
    switch (props.role) {
        case 'admin': return (
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã SV</th>
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
    }
}
export default ClassInfo;
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import decode from 'jwt-decode';

const API_classInfo = "http://localhost:5000/api/admin/studentInClass";
class ClassInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "",
            semester_id: null,
            classId: "",
            listStudent: [
                // {
                //     MSSV: 16020918,
                //     name: 'Nguyễn Tùng Dương',
                //     birth: '08-02-1998',
                //     classRoom: 'K61-CC',
                // }
            ],
            role: decode(localStorage.getItem('id_token')).role,
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('id_token');
        fetch(API_classInfo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ '_id': this.props.class_id })
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    className: response.className,
                    semester_id: response.semester_id,
                    classId: response.semantic_class_id,
                    listStudent: response.listStudent.map(student => ({
                        MSSV: student.MSSV,
                        birth: student.birth.toLocaleString(),
                        classRoom: student.classRoom,
                        name: student.studentName
                    }))
                })
            })
            .catch(error => console.log('Loi', error));
            JSON.stringify({ '_id': this.props.class_id });
    }

    render() {
        console.log(this.props);
        let listStudents;
        switch (this.state.role) {
            case 'admin':
                listStudents = this.state.listStudent.map((student, index) =>
                    <tr key={student.MSSV}>
                        <td>{index + 1}</td>
                        <td>{student.MSSV}</td>
                        <td>{student.name}</td>
                        <td>{student.birth}</td>
                        <td>{student.classRoom}</td>
                        <td>
                            <Link to="/report">
                            <button
                                className="btn btn-secondary"
                            >
                                Phiếu
                            </button>
                            </Link>
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
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.state.className} <br />
                            Năm học: {this.state.semester_id}<br />
                            Giảng viên: {this.state.teacherName}<br />
                            Lớp môn học: {this.state.classId}
                        </div>

                        <div className="panel-body">
                            <table width="100%" className="table table-striped table-bordered table-hover">
                                <HeaderTable role={this.state.role} />
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
import React, { Component } from 'react';
import Modal from './Modal';
import FormStudent from './FormStudent';

const API_allStudent = "http://localhost:5000/api/admin/allStudent";
const API_deleteStudent = "http://localhost:5000/api/admin/deleteStudent";
const API_updateInfoStudent = "http://localhost:5000/api/admin/updateInfoStudent";

class AllStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            firstToggle: false,
            secondToggle: false,
            studentSelected: null,
        };
        this.firstToggle = this.firstToggle.bind(this);
        this.secondToggle = this.secondToggle.bind(this);
        this.deleteSelectedStudent = this.deleteSelectedStudent.bind(this);
        this.editSelectedStudent = this.editSelectedStudent.bind(this);
        this.handleInfoFromForm = this.handleInfoFromForm.bind(this);
    }

    firstToggle() {
        this.setState({ firstToggle: !this.state.firstToggle });
    }

    secondToggle() {
        this.setState({ secondToggle: !this.state.secondToggle });
    }

    componentDidMount() {
        let token = localStorage.getItem('id_token');
        fetch(API_allStudent, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({ students: response });
            })
            .catch(error => console.log('Loi', error));
    }

    deleteSelectedStudent() {
        let token = localStorage.getItem('id_token');
        fetch(API_deleteStudent, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ 'mail': this.state.studentSelected.mail })
        }).then(response => response.json())
            .then(response => {
                if (response.message === "success") {
                    let newStudentState = this.state.students.filter( (student) => student.MSSV !== this.state.studentSelected.MSSV);
                    this.setState({ students: newStudentState });
                    this.secondToggle();
                    this.forceUpdate();
                }
            })
            .catch(error => console.log('Loi', error));
    }

    editSelectedStudent() {
        let token = localStorage.getItem('id_token');
        fetch(API_updateInfoStudent, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'MSSV': this.state.studentSelected.MSSV,
                'mail': this.state.studentSelected.mail,
                'studentName': this.state.studentSelected.studentName,
                'classRoom': this.state.studentSelected.classRoom,
                'semester_id': 1
            })
        }).then(response => response.json())
            .then(response => {
                if (response.message === "success") {
                    let students = this.state.students;
                    let indexStudentSelected = students.findIndex(student => student.MSSV === this.state.studentSelected.MSSV);
                    students[indexStudentSelected] = this.state.studentSelected;
                    this.setState({ students });
                    this.firstToggle();
                    this.forceUpdate();
                }
            })
            .catch(error => console.log('Loi', error));
    }

    handleInfoFromForm(student) {
        this.setState({ studentSelected: student });
    }

    render() {
        let listStudents = this.state.students.map((student, index) =>
            <tr 
                key={student.MSSV} 
                onClick={ () => {
                    this.setState({
                        firstToggle: !this.state.firstToggle,
                        studentSelected: student 
                    });
                }}
                style={{cursor: "pointer"}}
            >   
                <td 
                    className="text-center"
                    onClick={(e) => {
                        e.cancelBubble = true;
                        e.stopPropagation();
                        this.setState({
                            secondToggle: !this.state.secondToggle,
                            studentSelected: student
                        });
                    }}
                    style={{cursor: "pointer"}}
                >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </td>
                <td>{index + 1}</td>
                <td>{student.MSSV}</td>
                {/* <td>{student.password}</td> */}
                <td className="td-name">{student.studentName}</td>
                <td>{student.mail}</td>
                <td>{student.classRoom}</td>
            </tr>
        );

        return (
            <div>
                <Header title="Danh sách sinh viên" />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table width="100%" className="table table-striped table-bordered table-hover">
                                            {headerTable}
                                            <tbody>
                                                {listStudents}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.firstToggle ? <Modal 
                    component_1={<FormStudent
                        student={this.state.studentSelected}    
                        sendStudentToList={this.handleInfoFromForm}
                    />}
                    changeToggle={this.firstToggle}
                    size="modal-md"
                    action_1={this.firstToggle}
                    actionName_1="OK"
                    action_2={this.editSelectedStudent}
                    actionName_2="Lưu"
                    title="Thông tin sinh viên"
                /> : ""}

                {this.state.secondToggle ? <Modal 
                    component_1={<p className="text-center">Xác nhận xóa sinh viên </p>}
                    changeToggle={this.secondToggle}
                    size="modal-sm"
                    action_1={this.secondToggle}
                    actionName_1="Hủy"
                    action_2={this.deleteSelectedStudent}
                    actionName_2="Xác nhận"
                    title="Chú ý"
                /> : ""}
            </div>
        );
    }
}

const Header = (props) =>
    <div className="row">
        <div className="col-lg-12">
            <h1 className="page-header">{props.title}</h1>
        </div>
    </div>

const headerTable = (
    <thead>
        <tr>
            <th></th>
            <th>STT</th>
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>VNU email</th>
            <th>Khóa đào tạo</th>
        </tr>
    </thead>
);
export default AllStudents;
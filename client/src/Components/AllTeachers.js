import React, { Component } from 'react';
import Modal from './Modal';
import FormTeacher from './FormTeacher';

const API_allTeacher = "http://localhost:5000/api/admin/allLecturer";
const API_deleteTeacher = "http://localhost:5000/api/admin/deleteLecturer";
const API_updateInfoTeacher = "http://localhost:5000/api/admin/updateInfoLecturer";

class AllTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            teachers: [],
            firstToggle: false,
            secondToggle: false,
            teacherSelected: null,
        };
        this.firstToggle = this.firstToggle.bind(this);
        this.secondToggle = this.secondToggle.bind(this);
        this.deleteSelectedTeacher = this.deleteSelectedTeacher.bind(this);
        this.editSelectedTeacher = this.editSelectedTeacher.bind(this);
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
        fetch(API_allTeacher, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ teachers: response });
            })
            .catch(err => console.log('Loi' + err));
    }

    deleteSelectedTeacher() {
        let token = localStorage.getItem('id_token');
        this.secondToggle();
        fetch(API_deleteTeacher, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ 'mail': this.state.teacherSelected.mail })
        }).then(response => response.json())
            .then(response => {
                if (response.message === "success") {
                    let newTeacherState = this.state.teachers.filter( (teacher) => teacher.mail !== this.state.teacherSelected.mail);
                    this.setState({ teachers: newTeacherState });
                    this.forceUpdate();
                }
            })
            .catch(error => console.log('Loi', error));
    }

    editSelectedTeacher() {
        let token = localStorage.getItem('id_token');
        fetch(API_updateInfoTeacher, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'mail': this.state.teacherSelected.mail,
                'lecturerName': this.state.teacherSelected.lecturerName,
                'semester_id': 1
            })
        }).then(response => response.json())
            .then(response => {
                if (response.message === "success") {
                    let teachers = this.state.teachers;
                    console.log(teachers);
                    console.log(this.state.teacherSelected);
                    let indexTeacherSelected = teachers.findIndex(teacher => teacher.mail === this.state.teacherSelected.mail);
                    teachers[indexTeacherSelected] = this.state.teacherSelected;
                    this.setState({ teachers });
                    this.firstToggle();
                    this.forceUpdate();
                }
            })
            .catch(error => console.log('Loi', error));
    }

    handleInfoFromForm(teacher) {
        this.setState({ teacherSelected: teacher });
    }

    render() {
        let listTeachers = this.state.teachers.map((teacher, index) =>
            <tr 
                key={teacher.mail}
                onClick={ () => {
                    this.setState({
                        firstToggle: !this.state.firstToggle,
                        teacherSelected: teacher
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
                            teacherSelected: teacher
                        });
                    }}
                    style={{cursor: "pointer"}}
                >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </td>
                <td>{index + 1}</td>
                <td>{teacher.mail.split("@")[0]}</td>
                <td className="td-name">{teacher.lecturerName}</td>
                <td>{teacher.mail}</td>
            </tr>
        );

        return (
            <div>
                <Header title="Danh sách giảng viên" />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table width="100%" className="table table-striped table-bordered table-hover">
                                            {headerTable}
                                            <tbody>
                                                {listTeachers}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.firstToggle ? <Modal 
                    component_1={<FormTeacher 
                        teacher={this.state.teacherSelected}
                        sendTeacherToList={this.handleInfoFromForm}
                    />}
                    size="modal-md"
                    changeToggle={this.firstToggle}
                    action_1={this.firstToggle}
                    actionName_1="OK"
                    action_2={this.editSelectedTeacher}
                    actionName_2="Lưu"
                    title="Thông tin giảng viên"
                /> : ""}

                {this.state.secondToggle ? <Modal 
                    component_1={<p className="text-center">Xác nhận xóa giảng viên</p>}
                    changeToggle={this.secondToggle}
                    size="modal-sm"
                    action_1={this.secondToggle}
                    actionName_1="Hủy"
                    action_2={this.deleteSelectedTeacher}
                    actionName_2="Xác nhận"
                    title="Chú ý"
                /> : ""}
            </div>
        );
    }
}

const headerTable = (
    <thead>
        <tr>
            <th></th>
            <th>STT</th>
            <th>Tên đăng nhập</th>
            <th>Họ và tên</th>
            <th>VNU email</th>
        </tr>
    </thead>
);

const Header = (props) =>
    <div className="row">
        <div className="col-lg-12">
            <h1 className="page-header">{props.title}</h1>
        </div>
    </div>

export default AllTeachers;
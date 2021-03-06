import React, { Component } from 'react';

class FormStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.student !== undefined ? this.props.student.MSSV : "",
            password: this.props.student !== undefined ? this.props.student.password : "",
            name: this.props.student !== undefined ? this.props.student.studentName : "",
            classRoom: this.props.student !== undefined ? this.props.student.classRoom : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendStudentToList = this.sendStudentToList.bind(this);
        // this.validation = this.validation.bind(this);
    }

    sendStudentToList() {
        if (this.props.sendStudentToList !== undefined) {
            this.props.sendStudentToList({
                MSSV: this.state.userName,
                password: this.state.password,
                studentName: this.state.name,
                mail: this.state.userName + '@vnu.edu.vn',
                classRoom: this.state.classRoom,
            });
        }
    }

    handleChange(e) {
        let target = e.target
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <form>
                <div className="input-group col-lg-10 col-lg-offset-1">
                    <span className="label label-default">Tên đăng nhập/MSSV</span>
                    <input
                        className="form-control"
                        name="userName"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                        placeholder="MSSV phải có 8 chữ số"
                        value={this.state.userName}
                        onBlur={this.sendStudentToList}
                    />
                </div>
                
                <div className="input-group col-lg-10 col-lg-offset-1">
                    <span className="label label-default">Mật khẩu</span>
                    <input
                        className="form-control"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        onBlur={this.sendStudentToList}
                    />
                </div>

                <div className="input-group col-lg-10 col-lg-offset-1">
                    <span className="label label-default">Họ tên</span>
                    <input
                        className="form-control"
                        name="name"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.name}
                        onBlur={this.sendStudentToList}
                    />
                </div>

                <div className="input-group col-lg-10 col-lg-offset-1">
                    <span className="label label-default">Khóa đào tạo</span>
                    <input
                        className="form-control"
                        name="classRoom"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.classRoom}
                        onBlur={this.sendStudentToList}
                    />
                </div>
            </form>
        );
    }
}

export default FormStudent;
import React, { Component } from 'react';

class FormTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.teacher !== undefined ? this.props.teacher.mail.split("@")[0] : "",
            password: this.props.teacher !== undefined ? this.props.teacher.password : "",
            name: this.props.teacher !== undefined ? this.props.teacher.lecturerName : "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendTeacherToList = this.sendTeacherToList.bind(this);
        // this.validation = this.validation.bind(this);
    }

    sendTeacherToList() {
        if (this.props.sendTeacherToList !== undefined) {
            this.props.sendTeacherToList({
                userName: this.state.userName,
                password: this.state.password,
                lecturerName: this.state.name,
                mail: this.state.userName + '@vnu.edu.vn',
                // checked: this.validation()
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
                    <span className="label label-default">Tên đăng nhập</span>
                    <input
                        className="form-control"
                        name="userName"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                        value={this.state.userName}
                        onBlur={this.sendTeacherToList}
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
                        onBlur={this.sendTeacherToList}
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
                        onBlur={this.sendTeacherToList}
                    />
                </div>
            </form>
        );
    }
}

export default FormTeacher;
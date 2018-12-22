import React, { Component } from 'react';

class FormStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="input-group col-lg-6">
                    <span className="label label-default">Tên đăng nhập/MSV</span>
                    <input
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="input-group col-lg-6">
                    <span className="label label-default">Mật khẩu</span>
                    <input
                        className="form-control"
                        type="password"
                    />
                </div>

                <div className="input-group col-lg-6">
                    <span className="label label-default">Xác nhận mật khẩu</span>
                    <input
                        className="form-control"
                        type="password"
                    />
                </div>

                <div className="input-group col-lg-6">
                    <span className="label label-default">Họ tên</span>
                    <input
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="input-group col-lg-6">
                    <span className="label label-default">Khóa đào tạo</span>
                    <input
                        className="form-control"
                        type="text"
                    />
                </div>
            </div>
        );
    }
}

export default FormStudent;
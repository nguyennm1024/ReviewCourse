import React, { Component } from 'react';

class AllStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
        };
    }

    componentDidMount() {
        let token = localStorage.getItem('id_token');
        let url = "http://localhost:5000/api/admin/allStudent";
        fetch(url, {
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

    render() {
        let listStudents = this.state.students.map((student, index) =>
            <tr key={student.MSSV}>
                <td>{index + 1}</td>
                <td>{student.MSSV}</td>
                {/* <td>{student.password}</td> */}
                <td>{student.studentName}</td>
                <td>{student.mail}</td>
                <td>{student.classRoom}</td>
            </tr>
        );

        return (
            <div>
                {/* Header */}
                <Header title="Danh sách sinh viên" />
                {/* Header */}

                {/* Body */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="dataTables_length">
                                                <label>
                                                    Hiển thị <select className="form-control input-sm">
                                                        <option value="10">10</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                        <option value="200">200</option>
                                                    </select> sinh viên
                                    </label>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="dataTables_filter">
                                                <label>
                                                    Tìm kiếm:
                                    <input type="search" className="form-control input-sm" placeholder="true" aria-controls="dataTables-example" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table width="100%" className="table table-striped table-bordered table-hover" id="dataTables-example">
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
                </div>
                {/* Body */}
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
            <th>STT</th>
            <th>MSV/Tên đăng nhập</th>
            {/* <th>Mật khẩu</th> */}
            <th>Họ và tên</th>
            <th>VNU email</th>
            <th>Khóa đào tạo</th>
        </tr>
    </thead>
);
export default AllStudents;
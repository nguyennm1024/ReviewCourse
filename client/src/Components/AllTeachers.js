import React, { Component } from 'react';

const API_allTeacher = "http://localhost:5000/api/admin/allLecturer";

class AllTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = {teachers: []};
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

    render() {
        let listTeachers = this.state.teachers.map((teacher, index) => 
            <tr key={teacher.mail}>
                <td>{index + 1}</td>
                <td>{teacher.mail.split("@")[0]}</td>
                <td>{teacher.lecturerName}</td>
                <td>{teacher.mail}</td>
            </tr>
        );

        return (
            <div>
                <Header title="Danh sách giảng viên"/>
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
                                    </select> giảng viên
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
                                        {listTeachers}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

const headerTable = (
    <thead>
        <tr>
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
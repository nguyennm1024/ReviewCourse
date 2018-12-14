import React, { Component } from 'react';
import XLSX from 'xlsx';

const API_addTeacher = "http://localhost:5000/api/admin/createLecturer";

class AddTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = { teachers: [] };
        this.addFromExcel = this.addFromExcel.bind(this);
        this.addTeachers = this.addTeachers.bind(this);
    }

    addFromExcel(event) {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = event => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: 'binary' });
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            for (let row = 1; row > 0; row++) {
                if (worksheet[XLSX.utils.encode_cell({ c: 1, r: row })] === undefined) break;
                let teacher = {
                    userName: worksheet[XLSX.utils.encode_cell({ c: 1, r: row })].v,
                    password: worksheet[XLSX.utils.encode_cell({ c: 2, r: row })].v.toString(),
                    name: worksheet[XLSX.utils.encode_cell({ c: 3, r: row })].v,
                    mail: worksheet[XLSX.utils.encode_cell({ c: 4, r: row })].v,
                };
                this.setState({ teachers: [...this.state.teachers, teacher] });
            }
        }
        reader.readAsBinaryString(file);
    }

    addTeachers() {
        let token = localStorage.getItem('id_token');
        let list = this.state.teachers;
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            fetch(API_addTeacher, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    'mail': list[i].userName + '@vnu.edu.vn',
                    'password': list[i].password,
                    'lecturerName': list[i].name,
                    'semester_id': 1,
                })
            })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.log("loi" + err));
        }
    }

    render() {
        let listTeachers = this.state.teachers.map((teacher, index) =>
            <tr key={teacher.userName}>
                <td>{index + 1}</td>
                <td>{teacher.userName}</td>
                <td>{teacher.password}</td>
                <td>{teacher.name}</td>
                <td>{teacher.mail}</td>
            </tr>
        );

        return (
            <div>
                <Header title="Danh sách giảng viên đã chọn" />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input
                                    type="file"
                                    onChange={this.addFromExcel}
                                />
                            </div>

                            <div className="panel-body">
                                <table width="100%" className="table table-striped table-bordered table-hover">
                                    <thead>
                                        {headerTable}
                                    </thead>
                                    <tbody>
                                        {listTeachers}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.addTeachers}
                                >
                                    Thêm giảng viên
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const headerTable = (
    <tr>
        <th>STT</th>
        <th>Tên đăng nhập</th>
        <th>Mật khẩu</th>
        <th>Họ và tên</th>
        <th>VNU email</th>
    </tr>
);

const Header = (props) =>
    <div className="row">
        <div className="col-lg-12">
            <h1 className="page-header">{props.title}</h1>
        </div>
    </div>


export default AddTeachers;
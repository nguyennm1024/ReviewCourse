import React, { Component } from 'react';
import XLSX from 'xlsx';

const API_deleteStudent = "http://localhost:5000/api/admin/deleteStudent"
class DeleteStudents extends Component {
    constructor(props) {
        super(props);
        this.state = { students: [] };
        this.deleteFromExcel = this.deleteFromExcel.bind(this);
        this.deleteStudents = this.deleteStudents.bind(this);
    }

    deleteStudents() {
        let token = localStorage.getItem('id_token');

        let list = this.state.students;
        for (let i = 0; i < list.length; i++) {
            console.log(list[i]);
            fetch(API_deleteStudent, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    'mail': list[i].MSSV + '@vnu.edu.vn',
                })
            }).then(response => response.json())
                .then(response => {
                    console.log(response);
                })
        }
    }

    deleteFromExcel(event) {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = event => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: 'binary' });
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            for (let row = 1; row > 0; row++) {
                if (worksheet[XLSX.utils.encode_cell({ c: 1, r: row })] === undefined) break;
                let student = {
                    MSSV: worksheet[XLSX.utils.encode_cell({ c: 1, r: row })].v,
                    password: worksheet[XLSX.utils.encode_cell({ c: 2, r: row })].v,
                    name: worksheet[XLSX.utils.encode_cell({ c: 3, r: row })].v,
                    mail: worksheet[XLSX.utils.encode_cell({ c: 4, r: row })].v,
                    classRoom: worksheet[XLSX.utils.encode_cell({ c: 5, r: row })].v,
                };
                this.setState({ students: [...this.state.students, student] });
            }
        }
        reader.readAsBinaryString(file);
    }

    render() {
        let listStudents = this.state.students.map((student, index) =>
            <tr key={student.MSSV}>
                <td>{index + 1}</td>
                <td>{student.MSSV}</td>
                {/* <td>{student.password}</td> */}
                <td>{student.name}</td>
                <td>{student.mail}</td>
                <td>{student.classRoom}</td>
            </tr>
        );

        return (
            <div>
                <Header title="Danh sách sinh viên đã chọn" />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input
                                    type="file"
                                    className="form-control-file"
                                    onChange={this.deleteFromExcel}
                                />
                            </div>

                            <div className="panel-body">
                                <table width="100%" className="table table-striped table-bordered table-hover">
                                    {headerTable}
                                    <tbody>
                                        {listStudents}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.deleteStudents}
                                >
                                    Xóa sinh viên
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

const Header = (props) =>
    <div className="row">
        <div className="col-lg-12">
            <h1 className="page-header">{props.title}</h1>
        </div>
    </div>;

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
export default DeleteStudents;
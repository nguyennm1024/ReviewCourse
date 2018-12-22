import React, { Component } from 'react';
import XLSX from 'xlsx';

const API_deleteTeacher = "http://localhost:5000/api/admin/deleteLecturer";
class AddTeachers extends Component {
    constructor(props) {
        super(props);
        this.state = { teachers: [] };
        this.deleteFromExcel = this.deleteFromExcel.bind(this);
        this.deleteTeachers = this.deleteTeachers.bind(this);
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
                let teacher = {
                    userName: worksheet[XLSX.utils.encode_cell({ c: 1, r: row })].v,
                    password: worksheet[XLSX.utils.encode_cell({ c: 2, r: row })].v,
                    name: worksheet[XLSX.utils.encode_cell({ c: 3, r: row })].v,
                    mail: worksheet[XLSX.utils.encode_cell({ c: 4, r: row })].v,
                };
                this.setState({ teachers: [...this.state.teachers, teacher] });
            }
        }
        reader.readAsBinaryString(file);
    }

    deleteTeachers() {
        let token = localStorage.getItem('id_token');
        let list = this.state.teachers;
        for (let i = 0; i < list.length; i++) {
            console.log(list[i]);
            fetch(API_deleteTeacher, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    'mail': list[i].mail
                })
            }).then(response => response.json())
                .then(response => {
                    console.log(response);
                })
        }
    }

    render() {
        let listTeachers = this.state.teachers.map((teacher, index) =>
            <tr key={teacher.userName}>
                <td>{index + 1}</td>
                <td>{teacher.userName}</td>
                {/* <td>{teacher.password}</td> */}
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
                                <label className="btn btn-primary btn-file">
                                    Xóa từ tệp Excel
                                    <input
                                        type="file"
                                        onChange={this.deleteFromExcel}
                                        style={{ display: "none", }}
                                    />
                                </label>
                            </div>

                            <div className="panel-body">
                                <table width="100%" className="table table-striped table-bordered table-hover">
                                    {headerTable}
                                    <tbody>
                                        {listTeachers}
                                    </tbody>
                                </table>
                            </div>

                            <div className="panel-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.deleteTeachers}
                                >
                                    Xóa giảng viên
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
            <th>Tên đăng nhập</th>
            {/* <th>Mật khẩu</th> */}
            <th>Họ và tên</th>
            <th>VNU email</th>
        </tr>
    </thead>
);

export default AddTeachers;
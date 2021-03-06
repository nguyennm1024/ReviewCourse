import React, { Component } from 'react';
import XLSX from 'xlsx';

const API_addClassSurvey = "http://localhost:5000/api/admin/createReport";

class AddClassSurveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_id: "",
            semester_id: null,
            name: "",
            teacherName: "",
            teacherId: 0,
            listStudent: [],
            addSuccess: false,
        };
        this.addFromExcel = this.addFromExcel.bind(this);
        this.addClassSurvey = this.addClassSurvey.bind(this);
    }

    async addClassSurvey() {
        let token = localStorage.getItem("id_token");
        let list = this.state.listStudent;
        for (let i = 0; i < list.length; i++) {
            await fetch(API_addClassSurvey, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    'lecturerMail': this.state.teacherId + '@vnu.edu.vn',
                    'semantic_class_id': this.state.subject_id,
                    'subject_id': this.state.subject_id.split(" ")[0],
                    'className': this.state.name,
                    'lecturerName': this.state.teacherName,
                    'studentMail': list[i].MSSV + '@vnu.edu.vn',
                    'MSSV': list[i].MSSV,
                    'classRoom': list[i].classRoom,
                    'semester_id': 1,
                    'studentName': list[i].name,
                })
            })
            // response = response.json();
            // console.log(response);
        }
        this.setState({ addSuccess: true })
    }

    addFromExcel(event) {
        this.setState({
            subject_id: "",
            semester_id: null,
            name: "",
            teacherName: "",
            teacherId: 0,
            listStudent: [],
            addSuccess: false,
        });
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = event => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: 'binary' });
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            this.setState({
                subject_id: worksheet['C9'].v,
                semester_id: worksheet['A5'].v,
                name: worksheet['C10'].v,
                teacherName: worksheet['C7'].v,
                teacherId: worksheet['F10'].v,
            });
            for (let row = 11; true; row++) {
                if (worksheet[XLSX.utils.encode_cell({ c: 1, r: row })] === undefined) break;
                let student = {
                    MSSV: worksheet[XLSX.utils.encode_cell({ c: 1, r: row })].v,
                    name: worksheet[XLSX.utils.encode_cell({ c: 2, r: row })].v,
                    birth: worksheet[XLSX.utils.encode_cell({ c: 3, r: row })].v,
                    classRoom: worksheet[XLSX.utils.encode_cell({ c: 4, r: row })].v,
                };
                this.setState({ listStudent: [...this.state.listStudent, student] });
            }
        }
        
        reader.readAsBinaryString(file);
    }

    render() {
        let listStudents = this.state.listStudent.map((student, index) =>
            <tr key={student.MSSV}>
                <td>{index + 1}</td>
                <td>{student.MSSV}</td>
                <td className="td-name">{student.name}</td>
                <td>{student.birth}</td>
                <td>{student.classRoom}</td>
            </tr>
        );
        return (
                <div>
                    <Header title="Lớp khảo sát" />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <label className="btn btn-primary btn-file">
                                        Thêm từ tệp Excel
                                    <input
                                            type="file"
                                            onChange={this.addFromExcel}
                                            style={{ display: "none", }}
                                        />
                                    </label>
                                </div>

                                <div className="panel-body">
                                    <div className="col-lg-12">
                                        {this.state.name} <br />
                                        Năm học: {this.state.semester_id}<br />
                                        Giảng viên: {this.state.teacherName}<br />
                                        Lớp môn học: {this.state.subject_id}
                                    </div>
                                    <table className="table table-striped table-bordered table-hover" width="100%">
                                        {headerTable}
                                        <tbody>
                                            {listStudents}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="panel-footer text-center">
                                    {this.state.addSuccess ? <div className="alert alert-success">Thêm lớp khảo sát thành công</div>
                                    : <input
                                        type="button"
                                        value="Thêm lớp khảo sát"
                                        className="btn btn-primary"
                                        onClick={this.addClassSurvey}
                                        disabled={this.state.listStudent.length === 0 ? true : false}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
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
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Lớp khóa học</th>
        </tr>
    </thead>
);

export default AddClassSurveys;
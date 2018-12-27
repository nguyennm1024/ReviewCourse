import React, { Component } from 'react';
import XLSX from 'xlsx';
import Modal from './Modal';
import FormStudent from './FormStudent';

const API_addStudent = 'http://localhost:5000/api/admin/createStudent';

class AddStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      students: [],
      tempStudent: null,
      checkedTempStudent: false,
    };

    this.addFromExcel = this.addFromExcel.bind(this);
    this.addStudents = this.addStudents.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addStudentByHand = this.addStudentByHand.bind(this);
    this.handleStudentFromReport = this.handleStudentFromReport.bind(this);
    this.validation = this.validation.bind(this);
  }

  validation() {
    if (!!this.state.tempStudent
        && /^\(|\)|\d{8}$/.test(this.state.tempStudent.userName) 
        && !!this.state.tempStudent.password 
        && !!this.state.tempStudent.name) this.setState({ checkedTempStudent: true });
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  handleStudentFromReport(student){
    // console.log(this.state.tempStudent);
    this.setState({ tempStudent: student });
    this.validation();
  }

  addStudentByHand() {
    if (this.state.tempStudent !== undefined) {
      this.setState({ 
        students: [...this.state.students, this.state.tempStudent],
        tempStudent: null,
      });
      this.toggle();
    }
  }

  addFromExcel(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = event => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      for (let row = 1; ; row++) {
        if (worksheet[XLSX.utils.encode_cell({ c: 1, r: row })] === undefined) break;
        let student = {
          MSSV: worksheet[XLSX.utils.encode_cell({ c: 1, r: row })].v,
          password: worksheet[XLSX.utils.encode_cell({ c: 2, r: row })].v,
          studentName: worksheet[XLSX.utils.encode_cell({ c: 3, r: row })].v,
          mail: worksheet[XLSX.utils.encode_cell({ c: 4, r: row })].v,
          classRoom: worksheet[XLSX.utils.encode_cell({ c: 5, r: row })].v,
        };
        this.setState({ students: [...this.state.students, student] });
      }
    }
    reader.readAsBinaryString(file);
  }

  async addStudents() {
    let token = localStorage.getItem('id_token');
    let list = this.state.students;

    for (let i = 0; i < list.length; i++) {
      await fetch(API_addStudent, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          'MSSV': list[i].MSSV,
          'mail': list[i].MSSV + '@vnu.edu.vn',
          'password': list[i].password,
          'studentName': list[i].studentName,
          'classRoom': list[i].classRoom,
          'semester_id': 1,
        })
      })
      // response = response.json();
    }

  }

  render() {
    let listStudents = this.state.students.map((student, index) =>
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{student.MSSV}</td>
        <td className="td-name">{student.studentName}</td>
        <td>{student.mail}</td>
        <td>{student.classRoom}</td>
      </tr>
    );
    return (
      <div className={this.state.toggle ? "modal-open" : ""}>
        <Header title="Danh sách sinh viên đã chọn" />

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading clearfix">
                <div className="btn-group pull-left">
                  <label className="btn btn-primary btn-file">
                    Thêm thủ công
                    <input
                      type="button"
                      onClick={this.toggle}
                      style={{ display: "none", }}
                    />
                  </label>
                </div>

                <div className="btn-group pull-right">
                  <label className="btn btn-primary btn-file">
                    Thêm từ tệp Excel
                    <input
                      type="file"
                      onChange={this.addFromExcel}
                      style={{ display: "none", }}
                    />
                  </label>
                </div>
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
                  disabled={this.state.students.length === 0 ? true : false}
                  onClick={this.addStudents}
                >
                  Thêm sinh viên
                </button>
              </div>
            </div>
          </div>
        </div>

        {this.state.toggle ? <Modal 
            component_1={<FormStudent sendStudentToList={this.handleStudentFromReport} />}
            changeToggle={this.toggle}
            size="modal-md"
            action_1={this.toggle}
            actionName_1="Hủy"
            action_2={this.addStudentByHand}
            isDisabledAction={!!this.state.tempStudent ? false : true}
            actionName_2="Thêm vào danh sách"
            title="Thông tin sinh viên"
        /> : <div />}
      </div>
    )
  }
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
      <th>Họ và tên</th>
      <th>VNU email</th>
      <th>Khóa đào tạo</th>
    </tr>
  </thead>
);

export default AddStudents;
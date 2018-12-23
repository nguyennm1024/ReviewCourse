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
      students: []
    };

    this.addFromExcel = this.addFromExcel.bind(this);
    this.addStudents = this.addStudents.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
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
          name: worksheet[XLSX.utils.encode_cell({ c: 3, r: row })].v,
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
      const response = await fetch(API_addStudent, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          'MSSV': list[i].MSSV,
          'mail': list[i].MSSV + '@vnu.edu.vn',
          'password': list[i].password,
          'studentName': list[i].name,
          'classRoom': list[i].classRoom,
          'semester_id': 1,
        })
      })
      response = response.json();
    }

  }

  handleChange(e) {
    let target = e.target
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  render() {
    let listStudents = this.state.students.map((student, index) =>
      <tr key={student.MSSV}>
        <td>{index + 1}</td>
        <td>{student.MSSV}</td>
        <td>{student.password}</td>
        <td>{student.name}</td>
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
                  onClick={this.addStudents}
                >
                  Thêm sinh viên
                </button>
              </div>
            </div>
          </div>
        </div>

        {this.state.toggle ? <Modal 
            component={<FormStudent 
            
          />}
            changeToggle={this.toggle}
            // action={}
            actionName={"Thêm vào danh sách"}
            title={"Thông tin sinh viên"}
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
      <th>Mật khẩu</th>
      <th>Họ và tên</th>
      <th>VNU email</th>
      <th>Khóa đào tạo</th>
    </tr>
  </thead>
);
const Input = () =>
  <tr>
    <td></td>
    <td>
      <input
        type="text"
        className="form-control"
        required={true}
      // onFocus={true}
      // onChange={}
      />
    </td>
    <td>
      <input
        type="password"
        className="form-control"
        required={true}
      // onDragEnter={nextLine}  
      // onChange={}
      />
    </td>
    <td>
      <input
        type="text"
        className="form-control"
        required={true}
      // onChange={this.handleChange}
      // onChange={}
      />
    </td>
    <td>
      <input
        type="mail"
        className="form-control"
        required={false}
      // onChange={}
      />
    </td>
    <td>
      <input
        type="text"
        className="form-control"
        required={false}
      // onChange={}
      />
    </td>
  </tr>
export default AddStudents;
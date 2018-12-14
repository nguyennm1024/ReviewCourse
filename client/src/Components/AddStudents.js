import React, { Component } from 'react';
import XLSX from 'xlsx';

const API_addStudent = 'http://localhost:5000/api/admin/createStudent';

class AddStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {students: []};
        this.addFromExcel = this.addFromExcel.bind(this);
        this.addStudents = this.addStudents.bind(this);
        // this.listStudents = this.listStudents.bind(this);
    }

    addFromExcel(event) {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = event => {
            let data = event.target.result;
            let workbook = XLSX.read(data, {type: 'binary'});
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            for(let row = 1;; row ++) {
                if (worksheet[XLSX.utils.encode_cell({c: 1, r: row})] === undefined) break;
                let student = {
                    MSSV: worksheet[XLSX.utils.encode_cell({c: 1, r: row})].v,
                    password: worksheet[XLSX.utils.encode_cell({c: 2, r: row})].v,
                    name: worksheet[XLSX.utils.encode_cell({c: 3, r: row})].v,
                    mail: worksheet[XLSX.utils.encode_cell({c: 4, r: row})].v,
                    classRoom: worksheet[XLSX.utils.encode_cell({c: 5, r: row})].v,
                };
                this.setState({students: [...this.state.students, student]});
            }
        }
        reader.readAsBinaryString(file);  
    }

    async addStudents(){
      let token = localStorage.getItem('id_token');
      let list = this.state.students;

      for(let i = 0; i < list.length; i++) {
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
            <div>
            <Header title="Danh sách sinh viên đã chọn"/>
    
            <div className="row">
              <div className="col-lg-12">
                  <div className="panel panel-default">
                      <div className="panel-heading">
                          <input 
                            type="file"
                            className="form-control-file"
                            onChange={this.addFromExcel}
                          />
                      </div>
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
                                      <Input />
                                      {listStudents}
                                      
                                  </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
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
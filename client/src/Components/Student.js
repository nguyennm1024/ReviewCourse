import React, { Component } from 'react';
import Home from './Home';
import XLSX from 'xlsx';
class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listStudent: [],
    };
  }

  addByHand() {

  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="page-header"></div>
          <a className="col-lg-4 col-md-6">
            <button className="btn btn-primary btn-block">
              <i className="fa fa-list-alt fa-5x"></i>
              <h3>Xem danh sách</h3>
            </button>
            <div className="clearfix"></div>
          </a>
          
          <a className="col-lg-4 col-md-6">
            <button className="btn btn-primary btn-block">
              <i className="fa fa-plus fa-5x"></i>
              <h3>Thêm</h3>
            </button>
            <div className="clearfix"></div>
          </a>

          <a className="col-lg-4 col-md-6">
            <button className="btn btn-primary btn-block">
              <i className="fa fa-trash fa-5x"></i>
              <h3>Xóa</h3>
            </button>
            <div className="clearfix"></div>
          </a>
        </div>
      </div>
    );
  }
}


export default Student;
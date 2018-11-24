import React, { Component } from 'react';

class ClassCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classId: "",
            className: "",
            totalStudent: 0,
            isComplete: false,
        };
    }
    render() {
        return (
            <div className="col-md-3 col-sm-4">
              <div className="card" style={{display: 'block'}}>      
                <div className="card-body">
                  <h5 className="card-title">{this.props.classId}</h5>
                  <h4 className="card-title">{this.props.className}</h4>
                  <p className="card-text">Tổng số: {this.props.totalStudent}</p>
                  <p className="card-text">{this.props.isComplete ? "Đã hoàn thành":"Chưa hoàn thành"}</p>
                  <a className="btn btn-success">Xem chi tiết</a>
                </div>
              </div>
            </div>
        );
    }
}

export default ClassCard;
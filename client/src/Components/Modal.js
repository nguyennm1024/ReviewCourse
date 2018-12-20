import React, { Component } from 'react';
import Reports from './Reports';

const API_setReportToDefault = "http://localhost:5000/api/admin/setReportToDefault";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setReportToDefault = this.setReportToDefault.bind(this);
    }

    async setReportToDefault() {
        let token = localStorage.getItem('id_token');
        await fetch(API_setReportToDefault, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'student_id': this.props.student_id,
                'class_id': this.props._id
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.log("Loi" + err));
    }

    render() {
        return (
            <div>
                <div className={"modal fade in"} role='dialog' style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="close" onClick={this.props.changeToggle}>&times;</button>
                                <h4 className="modal-title"></h4>
                            </div>

                            <div className="modal-body">
                                <Reports
                                    _id={this.props._id}
                                    student_id={this.props.student_id}
                                    role={this.props.role}
                                    resetReport={this.setReportToDefault}
                                />
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-default" onClick={this.props.changeToggle}>OK</button>
                                <button 
                                    className="btn btn-default" 
                                    onClick={this.setReportToDefault}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade in"></div>
            </div>
        );
    }
}

export default Modal;
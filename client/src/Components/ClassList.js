import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import decode from 'jwt-decode';
import ClassInfo from './ClassInfo';

class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClass: [],
            role: decode(localStorage.getItem('id_token')).role,
            semester_id: 1,
        }
    }

    // componentDidMount() {
    //     // let data = {'semester_id': this.state.semester_id};
    //     let token = localStorage.getItem('id_token');
    //     let url = "http://localhost:5000/api/admin/allClass";
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token,
    //         },
    //         body: JSON.stringify({'semester_id': this.state.semester_id})
    //     }).then(response => response.json())
    //         .then(response => {
    //             // console.log(response);
    //             this.setState({ listClass: response.map(subject => ({
    //                 classId: subject.semantic_class_id,
    //                 className: subject.className,
    //                 semester_id: subject.semester_id,
    //             }))})
    //         })
    //         .catch(error => console.log('Loi', error));
    // }
    // componentWillMount() {
    //     this.setState({ listClass: this.props.listClass });
    // }

    render() {
        // console.log(this.state.listClass);
        // console.log(this.props.match.params.id);
        let listClass;
        switch (this.state.role) {
            case 'admin':
                listClass = this.props.listClass.map((subject, index) =>
                    <div key={index} className="col-lg-3 col-md-6">
                        <div className="panel panel-green">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">{subject.classId}</div>
                                        <div>Năm học: {subject.semester_id}</div>
                                    </div>
                                    <div className="col-xs-12 text-right">{subject.className}</div>
                                </div>
                            </div>
                            <Link to={"/infoClass" + subject.classId} >
                                <div className="panel-footer">
                                    <span className="pull-left">Xem chi tiết</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
                break;
            case 'student':
                listClass = this.state.listClass.map((subject, index) =>
                    <div key={index} className="col-lg-3 col-md-6">
                        <div className="panel panel-green">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">{subject.classId}</div>
                                        <div>Năm học: {subject.semester_id}</div>
                                    </div>
                                    <div className="col-xs-12 text-right">{subject.className}</div>
                                </div>
                            </div>
                            <Link to="/reportClass">
                                <div className="panel-footer">
                                    <span className="pull-left">Đánh giá môn học</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
                break;
            case 'lecturer':
                listClass = this.state.listClass.map((subject, index) =>
                    <div key={index} className="col-lg-3 col-md-6">
                        <div className="panel panel-green">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">{subject.classId}</div>
                                        <div>Năm học: {subject.semester_id}</div>
                                    </div>
                                    <div className="col-xs-12 text-right">{subject.className}</div>
                                </div>
                            </div>
                            <Link to="/classInfo">
                                <div className="panel-footer">
                                    <span className="pull-left">Xem chi tiết</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
                break;
        };

        return (
            <div className="row">
                {listClass}
                {/* <Route path="/classInfo" render={() => <ClassInfo roleUser={'admin'} />} /> */}
            </div>
        );
    }
}

export default ClassList;

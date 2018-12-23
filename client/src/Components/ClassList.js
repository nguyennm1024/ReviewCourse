import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import decode from 'jwt-decode';
import ClassInfo from './ClassInfo';


class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClass: [],
            semester_id: 1,
        }
    }

    render() {
        let listClass;
        switch (localStorage.getItem('role')) {
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
                            <Link to={"/infoClass" + subject.classId.replace(/\s/g, '')} >
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
                            <Link to={"/reportClass" + subject.classId.replace(/\s/g, '')}>
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
                            <Link to={"/infoClass" + subject.classId.replace(/\s/g, '')}>
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

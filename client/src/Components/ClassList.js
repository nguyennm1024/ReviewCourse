import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-book fa-4x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div><h3>{subject.classId}</h3></div>
                                        <div>Năm học: {this.state.semester_id + 2016} - {this.state.semester_id + 2017}</div>
                                    </div>
                                    <div className="col-xs-12 text-right">{subject.className}</div>
                                </div>
                            </div>
                           
                            <div className="panel-footer" style={{paddingRight: "0px", paddingLeft: "0px"}}>
                                <span 
                                    className="col-xs-1"
                                    onClick={() => {
                                        this.props.sendIdClass(subject._id);
                                        this.props.changeToggle();
                                    }}
                                    style={{cursor: "pointer"}}
                                >
                                    <i className="fa fa-trash"></i>
                                </span>
                                <Link to={"/infoClass" + subject.classId.replace(/\s/g, '')} >
                                    <span className="col-xs-10 text-right" style={{paddingRight: "0px"}}>Xem chi tiết <i className="fa fa-eye"></i></span>
                                </Link>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'student':
                listClass = this.props.listClass.map((subject, index) =>
                    <div key={index} className="col-lg-3 col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div><h3>{subject.classId}</h3></div>
                                        <div>Năm học: 2018</div>
                                    </div>
                                    <div className="col-xs-12 text-right">{subject.className}</div>
                                </div>
                            </div>
                            <Link to={"/reportClass" + subject.classId.replace(/\s/g, '')}>
                                <div className="panel-footer">
                                    <span className="pull-right">Đánh giá môn học <i className="fa fa-arrow-circle-right"></i></span>
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
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div><h3>{subject.classId}</h3></div>
                                        <div>Năm học: 2018</div>
                                    </div>
                                    <div className="col-xs-12 text-right">{subject.className}</div>
                                </div>
                            </div>
                            <Link to={"/infoClass" + subject.classId.replace(/\s/g, '')}>
                                <div className="panel-footer">
                                    <span className="pull-right">Xem chi tiết <i className="fa fa-eye"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
                break;
            default: break;
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

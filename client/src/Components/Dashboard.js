import React, { Component } from 'react';
import ClassList from './ClassList';
import { Link } from 'react-router-dom';
import ClassInfo from './ClassInfo';
import decode from 'jwt-decode';
import Reports from './Reports';

const StartSemester = 2018;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester_id: 1,
            listClass: [],
            idUser: localStorage.getItem('id_user'),
        };
    }

    componentDidMount() {
        const data = localStorage.getItem('role') === 'admin' 
                ? {'semester_id': this.state.semester_id} 
                : {'_id': this.state.idUser};
        const API_allClass = `http://localhost:5000/api/${localStorage.getItem('role')}/allClass`;
        let token = localStorage.getItem('id_token');
        fetch(API_allClass, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                let list;
                switch (localStorage.getItem('role')) {
                    case 'lecturer': 
                        list = response.teachingClass;
                        break;
                    case 'student': 
                        list = response.classRegistered;
                        break;
                    default: list = response;
                }
                this.setState({
                    listClass: list.map(subject => ({
                        classId: subject.semantic_class_id,
                        className: subject.className,
                        semester_id: subject.semester_id,
                        _id: subject._id,
                    }))
                });
                this.props.handleFromPage(this.state.listClass);
            })
            .catch(error => console.log('Loi', error));
    }

    render() {
        switch (localStorage.getItem('role')) {
            case 'admin': return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Các lớp khảo sát</h1>
                                <div className="row">
                                    <SemesterDropdown className="text-left" />
                                    <div className="text-right">
                                        <Link to="/addClassSurvey">
                                            <button className="btn btn-success">
                                                Thêm lớp khảo sát
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ClassList listClass={this.state.listClass} />
                </div>
            );
            case 'student': return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Các lớp khảo sát</h1>
                                <SemesterDropdown className="text-left" />
                            </div>
                        </div>
                    </div>
                    <ClassList listClass={this.state.listClass} />
                </div>
            );
            case 'lecturer': return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Các lớp khảo sát</h1>
                                <SemesterDropdown className="text-left" />
                            </div>
                        </div>
                    </div>
                    <ClassList listClass={this.state.listClass}/>
                </div>
            );
        };
    }
}

const SemesterDropdown = () => (
    <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Năm học{' '}
            <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><Link to="/201820191">2018-2019-HKI</Link></li>
            <li><Link to="/201720182">2017-2018-HKII</Link></li>
        </ul>
    </div>
);

export default Dashboard;
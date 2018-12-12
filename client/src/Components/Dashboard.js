import React, { Component } from 'react';
import ClassList from './ClassList';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

const StartSemester = 2018;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester_id: 3,
            classList: [
                // {
                //     classId: 'INT3306 1',
                //     className: "Phát triển ứng dụng Web",
                //     totalStudent: 50,
                //     isComplete: true,
                //     semester_id: 20182019,
                // },
                // {
                //     classId: 'INT6969 2',
                //     className: "Kho dữ liệu",
                //     totalStudent: 100,
                //     isComplete: false,
                //     semester_id: 20172019,
                // },
                // {
                //     classId: 'INT1234 5',
                //     className: "Thiết kế giao diện người dùng",
                //     totalStudent: 140,
                //     isComplete: false,
                //     semester_id: 20182019,
                // },
                // {
                //     classId: 'INT5555 2',
                //     className: "Trí tuệ nhân tạo",
                //     totalStudent: 30,
                //     isComplete: true,
                //     semester_id: 20182019,
                // },
            ],
            role: decode(localStorage.getItem('id_token')).role
        };
    }

    
    render() {
        switch (this.state.role) {
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
                    <ClassList />
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
                    <ClassList />
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
                    <ClassList />
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
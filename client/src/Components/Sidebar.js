import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('id_user');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        this.props.history.push('/login');
    }

    render() {
        switch (localStorage.getItem('role')) {
            case 'admin': return (
                <div className="navbar-default sidebar" style={{position: 'fixed'}}>
                    <div className="sidebar-nav navbar-collapse">
                        <Avatar name='Admin' />
                        <ul className="nav" id="side-menu" hidden={false}>
                            <li>
                                <Link to="/dashboard"><i className="fa fa-dashboard"></i> Khảo sát</Link>
                            </li>
                            <Dropdown
                                Dropdown="Sinh viên"
                                value="Students"
                            />
                            <Dropdown
                                Dropdown="Giảng viên"
                                value="Teachers"
                            />

                            <li>
                                <button
                                    className="btn btn-link logout-buttonr"
                                    onClick={this.logout}
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            );
            case 'student': return (
                <div className="navbar-default sidebar" style={{position: 'fixed'}}>
                    <div className="sidebar-nav navbar-collapse">
                        <Avatar name={localStorage.getItem('userName')} />
                        <ul className="nav" id="side-menu" hidden={false}>
                            <li>

                                <button
                                    className="btn btn-link logout-buttonr"
                                    onClick={this.logout}
                                >
                                    Đăng xuất
                            </button>
                            </li>
                        </ul>
                    </div>
                </div>
            );
            case 'lecturer': return (
                <div className="navbar-default sidebar" style={{position: 'fixed'}}>
                    <div className="sidebar-nav navbar-collapse">
                        <Avatar name={localStorage.getItem('userName')} />
                        <ul className="nav" id="side-menu" hidden={false}>
                            <li>
                                <button
                                    className="btn btn-link logout-buttonr"
                                    onClick={this.logout}
                                >
                                    Đăng xuất
                            </button>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
}

const Dropdown = props =>
    <li>
        <a><i className="fa fa-user"></i> {props.Dropdown}<span className="fa arrow"></span></a>
        <ul className="nav nav-second-level">
            <li>
                <Link to={"/all" + props.value}>Xem danh sách</Link>
            </li>
            <li>
                <Link to={"/add" + props.value}>Thêm</Link>
            </li>
            <li>
                <Link to={"/delete" + props.value}>Xóa</Link>
            </li>
        </ul>
    </li>;

const Avatar = props =>
    <li style={{ listStyleType: 'none' }}>
        <div className="panel panel-default text-center">
            <i className="fa fa-user fa-5x"></i>
            <div className="panel-header">
                <h4>{props.name}</h4>
            </div>
        </div>
    </li>;

export default withRouter(Sidebar);
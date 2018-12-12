import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import AddClassSurveys from './AddClassSurveys';
import ClassInfo from './ClassInfo';
import AllStudents from './AllStudents';
import AllTeachers from './AllTeachers';
import Dashboard from './Dashboard';
import AddStudents from './AddStudents';
import AddTeachers from './AddTeachers';
import DeleteStudents from './DeleteStudents';
import DeleteTeachers from './DeleteTeachers';
// import './page.css';

class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { role: decode(localStorage.getItem('id_token')).role };
    }

    render() {
        switch (this.state.role) {
            case 'admin': return (
                <div id="page-wrapper" >
                    <Switch>
                        <Route exact path="/" component={Dashboard} />

                        <Route path="/dashboard" component={Dashboard} />

                        <Route path="/classInfo" component={ClassInfo} />

                        <Route path="/addClassSurvey" component={AddClassSurveys} />

                        <Route path="/allStudents" component={AllStudents} />

                        <Route path="/addStudents" component={AddStudents} />

                        <Route path="/deleteStudents" component={DeleteStudents} />

                        <Route path="/allTeachers" component={AllTeachers} />

                        <Route path="/addTeachers" component={AddTeachers} />

                        <Route path="/deleteTeachers" component={DeleteTeachers} />

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );
            case 'student': return (
                <div id="page-wrapper" >
                    <Switch>
                        <Route exact path="/" component={Dashboard} />

                        <Route path="/reportClass"/>

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );
            case 'lecturer': return (
                <div id="page-wrapper" >
                    <Switch>
                        <Route exact path="/" component={Dashboard} />

                        <Route path="/classInfo" component={ClassInfo} />

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );
        }
    }
}
export default PageWrapper;
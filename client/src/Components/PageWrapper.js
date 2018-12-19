import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddClassSurveys from './AddClassSurveys';
import ClassInfo from './ClassInfo';
import AllStudents from './AllStudents';
import AllTeachers from './AllTeachers';
import Dashboard from './Dashboard';
import AddStudents from './AddStudents';
import AddTeachers from './AddTeachers';
import DeleteStudents from './DeleteStudents';
import DeleteTeachers from './DeleteTeachers';
import SurveyResult from './SurveyResult';
import Reports from './Reports';
// import './page.css';

class PageWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        this.setState({ list: data });
    }

    render() {
        switch (this.props.role) {
            case 'admin': return (
                <div id="page-wrapper">
                    <Switch>
                        <Route exact path="/" render={() => <Dashboard roleUser={'admin'} handleFromPage={this.handleData} />} />

                        <Route path="/dashboard" render={() => <Dashboard roleUser={'admin'} handleFromPage={this.handleData} />} />

                        {/* <Route path="/classInfo" render={() => <ClassInfo roleUser={'admin'} />} /> */}

                        {this.state.list.map(route => 
                            <Route 
                                key={route.classId}
                                path={"/infoClass" + route.classId}
                                render={() => 
                                    <ClassInfo class_id={route._id} />
                                }
                            />    
                        )}

                        <Route path="/addClassSurvey" component={AddClassSurveys} />

                        <Route path="/allStudents" component={AllStudents} />

                        <Route path="/addStudents" component={AddStudents} />

                        <Route path="/deleteStudents" component={DeleteStudents} />

                        <Route path="/allTeachers" component={AllTeachers} />

                        <Route path="/addTeachers" component={AddTeachers} />

                        <Route path="/deleteTeachers" component={DeleteTeachers} />

                        <Route path="/surveyResult" render={() => <SurveyResult roleUser={'admin'} />} />

                        {/* <Route path="/report" render={() => <Reports roleUser={'admin'} />} /> */}

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );

            case 'student': return (
                <div id="page-wrapper" >
                    <Switch>
                        <Route exact path="/" render={() => <Dashboard roleUser={'student'} />} />

                        <Route path="/reportClass"/>

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );

            case 'lecturer': return (
                <div id="page-wrapper" >
                    <Switch>
                        <Route exact path="/" render={() => <Dashboard roleUser={'lecturer'} />} />

                        <Route path="/classInfo" render={() => <ClassInfo roleUser={'lecturer'} />} />

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );
        }
    }
}

export default PageWrapper;
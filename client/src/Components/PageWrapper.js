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
        switch (localStorage.getItem('role')) {
            case 'admin': return (
                <div id="page-wrapper">
                    <Switch>
                        <Route exact path="/" render={() => <Dashboard roleUser='admin' handleFromPage={this.handleData} />} />

                        <Route path="/dashboard" render={() => <Dashboard roleUser='admin' handleFromPage={this.handleData} />} />

                        {this.state.list.map(route =>
                            <Route
                                key={route.classId.toLowerCase()}
                                path={"/infoClass" + route.classId.replace(/\s/g, '')}
                                render={() =>
                                    <ClassInfo
                                        _id={route._id}
                                        className={route.className}
                                        classId={route.classId}
                                    />
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

                        {this.state.list.map(result =>
                            <Route
                                key={result._id}
                                path={"/surveyResult" + result.classId.replace(/\s/g, '')}
                                render={() =>
                                    <SurveyResult
                                        class_id={result._id}
                                        subject_id={result.classId.split(' ')[0]}
                                        semester_id={result.semester_id}
                                    />
                                }
                            />
                        )}

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );

            case 'student': return (
                <div id="page-wrapper" >
                    <Switch>
                        <Route exact path="/" render={() => <Dashboard roleUser='student' handleFromPage={this.handleData} />} />

                        <Route path="/dashboard" render={() => <Dashboard roleUser='student' handleFromPage={this.handleData} />} />

                        {this.state.list.map(route =>
                            <Route
                                key={route.classId}
                                path={"/reportClass" + route.classId.replace(/\s/g, '')}
                                render={() =>
                                    <Reports
                                        student_id={localStorage.getItem("id_user")}
                                        _id={route._id}
                                        className={route.className}
                                    />
                                }
                            />
                        )}

                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );

            case 'lecturer': return (
                <div id="page-wrapper" >
                    <Switch>
                        <Route exact path="/" render={() => <Dashboard roleUser='lecturer' handleFromPage={this.handleData} />} />

                        <Route path="/dashboard" render={() => <Dashboard roleUser='lecturer' handleFromPage={this.handleData} />} />

                        {this.state.list.map(route =>
                            <Route
                                key={route.classId}
                                path={"/infoClass" + route.classId.replace(/\s/g, '')}
                                render={() =>
                                    <ClassInfo
                                        _id={route._id}
                                        className={route.className}
                                        classId={route.classId}
                                    />
                                }
                            />
                        )}

                        {this.state.list.map(result =>
                            <Route
                                key={result._id}
                                path={"/surveyResult" + result.classId.replace(/\s/g, '')}
                                render={() =>
                                    <SurveyResult
                                        class_id={result._id}
                                        subject_id={result.classId.split(' ')[0]}
                                        semester_id={result.semester_id}
                                    />
                                }
                            />
                        )}  
                        <Route component={() => <h1>Không tìm thấy trang</h1>} />
                    </Switch>
                </div>
            );
        }
    }
}

export default PageWrapper;
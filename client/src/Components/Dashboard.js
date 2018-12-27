import React, { Component } from 'react';
import ClassList from './ClassList';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const API_deleteClassSurvey = "http://localhost:5000/api/admin/deleteSurvey";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester_id: 1,
            listClass: [],
            idUser: localStorage.getItem('id_user'),
            toggle: false,
            classSelected: "",
        };
        this.toggle = this.toggle.bind(this);
        this.handleIdClass = this.handleIdClass.bind(this);
        this.deleteClassSurvey = this.deleteClassSurvey.bind(this);
    }

    toggle() {
        this.setState({ toggle: !this.state.toggle });
    }

    handleIdClass(idClass) {
        this.setState({ classSelected: idClass });
    }

    deleteClassSurvey() {
        let token = localStorage.getItem('id_token');
        fetch(API_deleteClassSurvey, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'class_id': this.state.classSelected
            })
        })
            .then(response => response.json())
            .then(response => {
                let newClassListState = this.state.listClass.filter( (_class) => _class._id !== this.state.classSelected);
                this.setState({ listClass: newClassListState });
                this.toggle();
                this.forceUpdate();
            })
            .catch(err => console.log("Loi" + err));
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
                                    <div className="text-right">
                                        <Link to="/addClassSurvey">
                                            <button className="btn btn-primary">
                                                Thêm lớp khảo sát
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ClassList 
                        listClass={this.state.listClass} 
                        changeToggle={this.toggle}
                        sendIdClass={this.handleIdClass}
                    />

                    {this.state.toggle ? <Modal 
                        component_1={<p className="text-center">Xác nhận xóa lớp khảo sát</p>}
                        changeToggle={this.toggle}
                        size="modal-sm"
                        action_1={this.toggle}
                        actionName_1="Hủy"
                        action_2={this.deleteClassSurvey}
                        actionName_2="Xác nhận"
                        title="Chú ý"
                    /> : ""}
                </div>
            );
            case 'student': return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header">
                                <h1>Các lớp khảo sát</h1>
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
                            </div>
                        </div>
                    </div>
                    <ClassList listClass={this.state.listClass}/>
                </div>
            );
            default: break;
        };
    }
}

export default Dashboard;
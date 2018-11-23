import React, { Component } from 'react';
import './Login.css';
import avatar from './avatar.png';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Admin from './Components/Admin/Admin';
import Student from './Components/Student/Student';
import Teacher from './Components/Teacher/Teacher';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0,
            redirectToReferrer: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({user: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        console.log(this.state);
        const user = {
            admin: 1,
            teacher: 2,
            student: 3,
        };
        return (
            <div className="loginbox">
                <img src={avatar} className="avatar" alt="user-logo"/>
                <h1>Login here</h1>
                <form
                    className=""
                    onSubmit={this.handleSubmit}>
                        <p>User name</p>
                        <input 
                            type="text" 
                            placeholder="Enter username"
                            onChange={this.handleChange}
                        />
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="Enter password"
                        />
                        <input
                            id="submit"
                            type="submit"
                            value="Login"
                        />
                        <a>Lost your password?</a><br/>
                        <a>Don't have an account?</a><br/>
                </form>
            </div>
        );
    }
}

export default Login;

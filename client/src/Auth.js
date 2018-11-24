import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Login from './Login';
import Home from './Components/Home/Home';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: true,};
        this.updateAuthenticate = this.updateAuthenticate.bind(this);
    }

    updateAuthenticate() {
        this.setState({
            isAuthenticated: true,
        })
    }

    render() {
        if (this.isAuthenticated) return (<Home />)
        return (
            <Login 
                isAuthenticated={this.updateAuthenticate}
            />
        );
    } 
}

export default Auth;
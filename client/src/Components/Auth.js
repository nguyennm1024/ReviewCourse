import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            userType: null,
            user: "",
        };
        this.updateAuthenticate = this.updateAuthenticate.bind(this);
        this.getStateFromLogin = this.getStateFromLogin.bind(this);
    }

    updateAuthenticate() {
        this.setState({
            isAuthenticated: true,
        })
    }

    getStateFromLogin(dataFromLogin) {
        console.log(dataFromLogin);
        this.setState({ userType: dataFromLogin.user, user: dataFromLogin.user });
        if (this.state.user !== null) this.setState({ isAuthenticated: true });
    }

    render() {
        if (this.isAuthenticated) return (
            <Home
                userType={this.state.user}
                user={this.state.user}
            />
        ); 
        else 
        return (
            <Login 
                callBackFromAuth={this.getStateFromLogin}
            />
        );
    } 
}

function PrivateRoute ({component: Component,authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to='/login' />}
      />
    )
  }

export default Auth;
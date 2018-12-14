import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './Components/Login';
import AuthService from './Components/AuthService';
const Auth = new AuthService();

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/login" component={Login} /> 
                <PrivateRoute component={App}/>
            </Switch>
        </div>
    </Router>,
document.getElementById('root'));

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
           Auth.loggedIn() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                // state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }


if (module.hot) {
    module.hot.accept();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

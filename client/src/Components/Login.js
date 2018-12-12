import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthService from './AuthService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            redirectToReferrer: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleChange(e) {
        let target = e.target
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.Auth.login(this.state.user, this.state.password)
            .then(res => {
                console.log(res);
                this.props.history.replace('/')
            })
            .catch(err => console.log("Loi" + err));
    }

    componentWillMount() {
        if (this.Auth.loggedIn()) this.props.history.replace('/');
    }

    render() {
        return ( 
            <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Vui lòng đăng nhập</h3>
                        </div>
                        <div className="panel-body">
                            <form
                                role="form"
                                onSubmit={this.handleSubmit}
                            >
                                <fieldset>
                                    <div className="form-group">
                                        <input
                                            className="form-control" 
                                            placeholder="E-mail" 
                                            name="user"
                                            type="text" 
                                            onChange={this.handleChange}
                                            autoFocus={true} 
                                            value={this.state.user}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            className="form-control" 
                                            placeholder="Mật khẩu" 
                                            name="password"
                                            type="password" 
                                            onChange={this.handleChange}
                                            value={this.state.password}
                                        />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input name="remember" type="checkbox" value="Remember Me" />Remember Me
                                        </label>
                                    </div>
                                        <input
                                            className="btn btn-lg btn-success btn-block"
                                            type="submit"
                                            value="Đăng nhập"
                                        />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default withRouter(Login);

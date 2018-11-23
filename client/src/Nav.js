import React, { Component } from 'react';
import Search from './Search';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  onClicked() {

  }

  render() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" >Class Survey</a>
        
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link">Home <span className="sr-only">(current)</span></a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link">Sinh viên</a>
            </li>
        
            <li className="nav-item">
              <a className="nav-link">Giảng viên</a>
            </li>
          </ul>
        </div>  
        
        <Search />
        
        <li className="nav-item">
          <a className="nav-link" >User</a>
        </li>
        </nav>
    );
  }
}

export default Nav;

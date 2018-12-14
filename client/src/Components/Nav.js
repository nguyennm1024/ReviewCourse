import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top" style={{ marginBottom: '0' }}>
        <div className="navbar-header">
          <Link to="/dashboard"><div className="navbar-brand">Class Survey</div></Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown"></li>
        </ul>

        <Sidebar role={this.props.role}/>
      </nav>
    );
  }
}

export default Nav;

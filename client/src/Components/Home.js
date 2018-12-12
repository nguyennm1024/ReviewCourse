import React, { Component } from 'react';
import Nav from './Nav';
import PageWrapper from './PageWrapper';
import Sidebar from './Sidebar';
import decode from 'jwt-decode';

// const role = decode(localStorage.getItem('id_token')).role;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { role: decode(localStorage.getItem('id_token')).role };
  }

  render() {
    return (
      <div id="wrapper">
        <Nav role={this.state.role}/>
        <PageWrapper role={this.state.role}/>
      </div>
    );
  }
}

export default Home;

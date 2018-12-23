import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import decode from 'jwt-decode';
import AuthService from './AuthService';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <PageWrapper />
      </div>
    );
  }
}

export default Home;

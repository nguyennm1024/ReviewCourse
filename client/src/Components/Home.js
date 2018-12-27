import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import AuthService from './AuthService';
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

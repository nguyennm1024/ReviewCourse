import React, { Component } from 'react';

import ClassCard from '../../ClassCard';
import Nav from '../../Nav';
import ClassList from '../../ClassList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      
    };
  }

  render() {
    return (
        <div className="container-fluid">
          <Nav />
          <ClassList />
        </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import Nav from './Nav';
import PageWrapper from './PageWrapper';
import decode from 'jwt-decode';
import AuthService from './AuthService';
import { Modal, Button } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {
    return (
      <div id="wrapper">
        <Nav role={this.Auth.getProfile().role}/>
        <PageWrapper role={this.Auth.getProfile().role}/>
      </div>
      // <div className="static-modal">
      //   <Modal.Dialog>
      //     <Modal.Header>
      //       <Modal.Title>Modal title</Modal.Title>
      //     </Modal.Header>

      //     <Modal.Body>One fine body...</Modal.Body>

      //     <Modal.Footer>
      //       <Button>Close</Button>
      //       <Button bsStyle="primary">Save changes</Button>
      //     </Modal.Footer>
      //   </Modal.Dialog>
      // </div>
    );
  }
}

export default Home;

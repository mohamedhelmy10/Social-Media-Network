import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
class HomeBar extends Component {
  render() {
    return (
        <div className="navigationBarContainer">
        <Navbar className="navigationBar" bg="light" expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/log-in">LogOut</Nav.Link>
                  <Nav.Link href="/friends">Friends</Nav.Link>
                  <Nav.Link href="/friendRequests">Friend Requests</Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default HomeBar;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";



class Bar extends Component {
  render() {
    return (
        <div className="navigationBarContainer">
        <Navbar className="navigationBar" bg="light" expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                  <Nav.Link href="/Log-in">Log In</Nav.Link> 
              </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Bar;
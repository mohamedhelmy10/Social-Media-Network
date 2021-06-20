import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
class HomeBar extends Component {
  render() {
    const currUserId = localStorage.getItem('currUserId');
    const homePath = "/"+currUserId+"/home";
    const profilePath = "/"+currUserId+"/profile/"+currUserId;
    const loginPath = "/log-in";
    const friendsPath = "/"+currUserId+"/friends";
    const friendRequestsPath = "/"+currUserId+"/friendRequests";
    return (
        <div className="navigationBarContainer">
        <Navbar className="navigationBar" bg="light" expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link href={homePath}>Home</Nav.Link>
                  <Nav.Link href={profilePath}>Profile</Nav.Link>
                  <Nav.Link href={loginPath}>LogOut</Nav.Link>
                  <Nav.Link href={friendsPath}>Friends</Nav.Link>
                  <Nav.Link href={friendRequestsPath}>Friend Requests</Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default HomeBar;
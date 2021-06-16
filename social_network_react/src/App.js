import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

// Views 
import Home from './views/Welcome.js';
import SignUp from './views/SignUp.js';
import LogIn from './views/LogIn.js';

class App extends Component {
  render() {
    return (
      <div className="container" fluid="true">
        <div className="header"></div>
        <React.StrictMode>
          <Router>
            <div className="navigationBarContainer">
              <Navbar className="navigationBar" bg="light" expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="./">Home</Nav.Link>
                        <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                        <Nav.Link href="./Log-in">Log In</Nav.Link> 
                    </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/log-in" component={LogIn} />
            </Switch>
          </Router>
        </React.StrictMode>
      </div>
    );
  }
}

export default App;
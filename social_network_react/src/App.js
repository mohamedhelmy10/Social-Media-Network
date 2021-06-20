import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";


// Views 
import Welcome from './views/Welcome.js';
import SignUp from './views/SignUp.js';
import LogIn from './views/LogIn.js';
import Home from './views/Home.js';
import Profile from './views/Profile.js';
import MyProfile from './views/MyProfile.js';
import Friends from './views/Friends.js';
import FriendRequests from './views/FriendRequests.js';
import Comments from './views/Comments.js';
import Reactions from './views/Reactions.js';
 class App extends Component {
  render() {
    return (
      <div className="container" fluid="true">
        <div className="header"></div>
        <React.StrictMode>
          <Router>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/log-in" component={LogIn} />
              <Route path="/home" component={Home} />
              <Route path="/profile/:profileId" component={Profile} />
              <Route path="/profile" component={MyProfile} />
              <Route path="/friends" component={Friends} />
              <Route path="/friendRequests" component={FriendRequests} />
              <Route path="/posts/:postId/comments" component={Comments} />
              <Route path="/posts/:postId/reactions" component={Reactions} />
            </Switch>
          </Router>
        </React.StrictMode>
      </div>
    );
  }
}

export default App;
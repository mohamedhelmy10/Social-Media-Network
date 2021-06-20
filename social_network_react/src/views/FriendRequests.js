import React, { Component } from 'react';
import Friend from '../components/Friend.js';
import  HomeBar from './homeBar.js';
import {getRequests} from '../api/friends.js';

class FriendRequests extends Component{
    constructor(props) {
        super(props)
        this.state = {
            requests: []
        }
    }
    
    componentDidMount() {
        getRequests.call(this);
    }

    renderRequest() {
        return this.state.requests.map((request, index) => (
            <div>
                <Friend key={index} friend={request}/>
            </div>
        ));
    }
    render(){
        return (
            <div>
                <HomeBar/>
                {this.renderRequest()}
            </div>
        );
    }
}

export default FriendRequests;
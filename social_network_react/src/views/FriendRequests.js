import React, { Component } from 'react';
import  FriendRequest from '../components/FriendRequest.js';
import   HomeBar from './homeBar.js';
import  { getRequests } from '../api/friends.js';

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
        console.log(this.state.requests);   
        return this.state.requests.map((request, index) => (
            <div>
                <FriendRequest key={index} friend={request}/>
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
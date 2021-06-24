import React, { Component } from 'react';
import Friend from '../components/Friend.js';
import  HomeBar from './homeBar.js';
import {getFriends} from '../api/friends.js';

class Friends extends Component{
    constructor(props) {
        super(props)
        this.state = {
            friends: []
        }
    }
    
    componentDidMount() {
        getFriends.call(this);
    }

    renderFriend() {
        console.log(this.state.friends);
        return this.state.friends.map((friend, index) => (
            <div>
                <Friend key={index} friend={friend}/>
            </div>
        ));
    }
    render(){
        return (
            <div>
                <HomeBar/>
                {this.renderFriend()}
            </div>
        );
    }
}

export default Friends;
import React, { Component } from 'react';
import Friend from '../components/Friend.js';
import  HomeBar from './homeBar.js';
import {getFriends} from '../api/friends.js';
import { Redirect } from "react-router-dom";
import Bar from './Bar.js'; 

class Friends extends Component{
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            redirect: ""
        }
    }
    
    componentDidMount() {
        if (localStorage.getItem('currUserId')){
            let data = getFriends();
            data.then( result => {
                if (result){
                    if (result.error)
                        alert(result.error);
                    else
                        this.setState({friends: result.data});
                }
            });
        }else
            this.setState({redirect: '/log-in'});
    }

    renderFriend() {
        return this.state.friends.map((friend, index) => (
            <div>
                <Friend key={index} friend={friend}/>
            </div>
        ));
    }
    render(){
        if (this.state.redirect) {
            return(
                <div>
                     <Bar/>
                    <Redirect to={this.state.redirect} />
                </div>
            );  
        }
        return (
            <div>
                <HomeBar/>
                {this.renderFriend()}
            </div>
        );
    }
}

export default Friends;
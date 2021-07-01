import React, { Component } from 'react';
import  FriendRequest from '../components/FriendRequest.js';
import   HomeBar from './homeBar.js';
import  { getRequests } from '../api/friends.js';
import { Redirect } from "react-router-dom";
import Bar from './Bar.js'; 

class FriendRequests extends Component{
    constructor(props) {
        super(props)
        this.state = {
            requests: [],
            redirect: ""
        }
    }
    
    componentDidMount() {
        if (localStorage.getItem('currUserId')){
            let data = getRequests();
            data.then(result => {
                if (result){
                    if (result.error)
                        alert (result.error)
                    else
                        this.setState({requests : result.data});
                }
            });
        }else
            this.setState({redirect: '/log-in'});
    }

    renderRequest() {  
        return this.state.requests.map((request, index) => (
            <div>
                <FriendRequest key={index} friend={request}/>
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
                {this.renderRequest()}
            </div>
        );
    }
}

export default FriendRequests;
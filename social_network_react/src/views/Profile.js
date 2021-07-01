import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import Post from '../components/Post.js';
import  HomeBar from './homeBar.js';
import {getProfilePosts} from '../api/posts.js';
import {sendFriendRequest} from '../api/friends.js';
import { Redirect } from "react-router-dom";
import Bar from './Bar.js'; 

class Profile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            postsAndUser: [],
            redirect:""
        }
        this.handleSendClick = this.handleSendClick.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('currUserId')){
            const userId = this.props.match.params.profileId;
            let data = getProfilePosts(userId);
            data.then(result=>{
                if (result){
                    if(result.error)
                        alert(result.error);
                    else
                        this.setState({postsAndUser: result}); 
                }
            });
        }else
            this.setState({redirect: '/log-in'});
    }

    renderPosts() {
        const user = this.state.postsAndUser[0];
        return this.state.postsAndUser.map((post, index) => (
                (index !==0)&&
                <div>
                    <Post key={index} post={post.data} user = {user.data}/>
                </div>
        ));
    }
    handleSendClick= (e)=> {
        const user = this.state.postsAndUser[0].data;
        e.preventDefault();
        let data = sendFriendRequest(user.id);
        data.then(result=>{
            if (result){
                if(result.error)
                    alert(result.error);
            }
        });
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
                <div className="buttonsList">
                    <Button  variant="outline-light" size="sm" onClick = {this.handleSendClick}>
                        Send Friend Request
                    </Button>
                </div>
                {this.renderPosts()}
            </div>
        );
    }
}

export default Profile;
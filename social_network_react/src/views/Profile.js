import React, { Component } from 'react'
import Post from '../components/Post.js';
import  HomeBar from './homeBar.js';
import {getProfilePosts} from '../api/posts.js';
class Profile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            postsAndUser: []
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.profileId;
        getProfilePosts.call(this, userId);
    }

    renderPost() {
        const user = this.state.postsAndUser[0];
        return this.state.postsAndUser.map((post, index) => (
                (index !=0)&&
                <div>
                    <Post key={index} post={post} user = {user}/>
                </div>
        ));
    }
    render(){
        return (
            <div>
                <HomeBar/>
                {this.renderPost()}
            </div>
        );
    }
}

export default Profile;
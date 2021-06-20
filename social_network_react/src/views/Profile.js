import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import axios from 'axios'
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
        const userId = this.props.match.params.userId;
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
            <div className="col-md-4">
                <div className="col-md-5">
                    <div className="form-area">  
                        <form role="form">
                            <br styles="clear:both" />             
                            <div className="form-group">
                                <textarea className="form-control" type="textarea" id="caption" placeholder="Start a post" cols="50" rows="10" ></textarea>
                            </div>                   
                            <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
                        </form>
                    </div>
                </div>
                {this.renderPost()}
            </div>
            </div>
        );
    }
}

export default Profile;
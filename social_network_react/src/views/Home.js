import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import Post from '../components/Post.js';
import  HomeBar from './homeBar.js';
import Comments from './Comments.js';
import {getPosts} from '../api/posts.js';
class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            postsAndUsers: []
        }
    }
    
    componentDidMount() {
        getPosts.call(this);
    }

    renderPost() {
        return this.state.postsAndUsers.map((postAndUser, index) => (
            <div>
                <Post key={index} post={postAndUser.post} user={postAndUser.user}/>
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

export default Home;
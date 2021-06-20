import React, { Component } from 'react';
import Comment from '../components/Comment.js';
import  HomeBar from './homeBar.js';
import {getComments} from '../api/comments.js'

class Comments extends Component{
    constructor(props) {
        super(props)
        this.state = {
            commentsAndUsers: []
        }   
    }
    
    componentDidMount() {
        const postId = this.props.match.params.postId;
        getComments.call(this,postId );
    }


    renderComment() {
        return this.state.commentsAndUsers.map((commentAndUser, index) => (
            <div>
                <Comment key={index} comment={commentAndUser.comment} user= {commentAndUser.user}/>
            </div>
        ));
    }
    render(){
        return (
            <div>
                <HomeBar/>
                {this.renderComment()}
            </div>
        );
    }
}

export default Comments;

import React, { Component } from 'react';
import Comment from '../components/Comment.js';
import  HomeBar from './homeBar.js';
import { Form, Button } from "react-bootstrap";
import {getComments} from '../api/comments.js';
import {createComment} from '../api/comments.js'

class Comments extends Component{
    constructor(props) {
        super(props)
        this.state = {
            commentsAndUsers: [],
            comment: {}
        }   
    }
    
    componentDidMount() {
        const postId = this.props.match.params.postId;
        let data = getComments(postId);
        data.then(result=>{
            if(result.error)
                alert(result.error);
            else
                this.setState({commentsAndUsers: result})    
        });
    }
    handleChange = (event) => {

        this.setState(prevState => {
            let comment = Object.assign({}, prevState.comment);
            comment[event.target.name] = event.target.value; 
            return { comment };                                
        })
    }
    handleSubmit= (e)=> {
        e.preventDefault();
        const postId = this.props.match.params.postId;
        let data = createComment(postId, this.state.comment);
        data.then(result=>{
            if(result.error)
                alert(result.error);
            else{
                var newCommentsAndUsers = this.state.commentsAndUsers;
                newCommentsAndUsers.push(result);
                this.setState({commentsAndUsers:newCommentsAndUsers, comment:{}});
            }
                
        });
    }

    renderComments() {
        return (this.state.commentsAndUsers.map((commentAndUser, index) => (
            <div>
                <Comment key={index} comment={commentAndUser.comment.data} user= {commentAndUser.user.data}/>
            </div>
        ))
            
        );
    }
    render(){
        return (
            <div>
                <HomeBar/>
            <div className="col-md-4" className="comment">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Control type="textarea"  placeholder="Add your comment"  style={{ height: 200 , textAlign: "center"}}  name = "body" onChange={this.handleChange} />
                </Form.Group>             
                <Button variant="primary" type="submit">
                    Add Comment
                </Button> 
            </Form>
            </div>
                {this.renderComments()}
            </div>
        );
    }
}

export default Comments;

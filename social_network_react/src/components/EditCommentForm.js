import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router';
import {updateComment, getComment} from '../api/comments.js';
import  HomeBar from '../views/homeBar.js';

class EditCommentForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            comment: {},
            redirect: ''
        }
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
        updateComment.call(this, this.state.comment);
    }
    componentDidMount(){
        const postId = this.props.match.params.postId;
        const commentId = this.props.match.params.commentId;
        getComment.call(this, postId, commentId);
    }
    
    render(){
        if (this.state.redirect){
            return (<Redirect to = {this.state.redirect}/>);
        }
        return(
            <div>
                <HomeBar/>
                <div className="col-md-4" className="comment">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Control type="textarea" value={this.state.comment.body} style={{ height: 200 , textAlign: "center"}}  name = "body" onChange={this.handleChange} />
                    </Form.Group>             
                    <Button variant="primary" type="submit">
                        Update Comment
                    </Button> 
                </Form>
                </div>
            </div>
        );
    }
}

export default EditCommentForm ;  
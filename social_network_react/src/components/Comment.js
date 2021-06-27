import React, { Component } from 'react'
import { Nav } from "react-bootstrap";
import { Redirect} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {deleteComment} from '../api/comments.js';

class Comment extends Component{
    constructor(props) {
        super(props)
        this.state = {
            comment: {},
            redirect:''
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleDeleteClick= (e)=> {
        e.preventDefault();
        let data = deleteComment(this.props.comment.post_id, this.props.comment.id);
        data.then(result=>{
            if(result.error)
                alert(result.error);
        });
    }
    handleEditClick= (e)=> {
        e.preventDefault();
        const path = "/posts/"+ this.props.comment.post_id + "/comments/"+this.props.comment.id;
        this.setState({redirect: path});    
    }

    render(){
        if (this.state.redirect) {
            return(
                <div>
                    <Redirect to={this.state.redirect} />
                </div>
            );
        }
        const currUserId = localStorage.getItem('currUserId');
        var profilePath;
        if (currUserId == this.props.user.id)
             profilePath = "/profile";
        else
             profilePath = "/profile/"+this.props.user.id;
             
        const userName = this.props.user.first_name+" "+this.props.user.last_name;

        return (   
            <div className="comment">  
                <Nav className="flex-column" className="userName">
                    <Nav.Link href={profilePath}>{userName}</Nav.Link>
                </Nav>
                <div className="content">
                    <h2 className ="data">{this.props.comment.body}</h2>
                </div>
                <div className="buttonsList">
                    <Button  variant="outline-light" size="sm" onClick = {this.handleEditClick}>
                        Edit Comment
                    </Button>
                    <Button  variant="outline-light" size="sm" onClick = {this.handleDeleteClick}>
                        Delete Comment
                    </Button>
                </div>
            </div>  
        );
    }
}

export default Comment; 
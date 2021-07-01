import React, { Component } from 'react'
import { Form, Button, Nav} from "react-bootstrap";
import {deleteComment} from '../api/comments.js';
import {updateComment} from '../api/comments.js';

class Comment extends Component{
    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.comment,
            mode: "view"
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleDeleteClick= (e)=> {
        e.preventDefault();
        let data = deleteComment(this.props.comment.attributes.post_id, this.props.comment.id);
        data.then(result=>{
            if(result.error)
                alert(result.error);
            else
                this.setState({mode: "deleted"}); 
        });
    }
    handleEditClick= (e)=> {
        e.preventDefault();
        this.setState({mode: "edit"});    
    }

    handleChange = (event) => {
        this.setState(prevState => {
            let comment = Object.assign({}, prevState.comment);
            comment.attributes[event.target.name] = event.target.value; 
            return { comment };                                
        })
    }
    handleSubmit= (e)=> {
        e.preventDefault();
        let data = updateComment(this.state.comment);
        data.then(result=>{
            if (result){
                if(result.error)
                    alert(result.error);
                else{
                    this.setState({ comment: result.data , mode: "view"});  
                }   
            } 
        });
    }


    renderViewComment(){
        const currUserId = localStorage.getItem('currUserId');
        const userName = this.props.user.attributes.first_name+" "+this.props.user.attributes.last_name;
        var profilePath;
        if (currUserId === this.props.user.id)
             profilePath = "/profile";
        else
             profilePath = "/profile/"+this.props.user.id;
             
        return (
            <div className="comment">
                <Nav className="flex-column" className="userName">
                    <Nav.Link href={profilePath}>{userName}</Nav.Link>
                </Nav>
                <div className="content">
                    <h2 className ="data">{this.state.comment.attributes.body}</h2>
                </div>
                {this.renderEditDeleteButtons()}
            </div>
        );
    }
    renderEditComment(){
        return (
            <div className="comment">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicFirstName" className="content">
                        <Form.Control type="textarea" value={this.state.comment.attributes.body} style={{ height: 200 , textAlign: "center"}}  name = "body" onChange={this.handleChange} />
                    </Form.Group>             
                    <Button variant="primary" type="submit" className="button">
                        Update Comment
                    </Button> 
                </Form>
            </div>
        );
    }
    renderViewOrEditComment(){
        if(this.state.mode==="view"){
            return(
                <div>
                    {this.renderViewComment()}
                </div>
            );
        }else if(this.state.mode==="edit"){
            return(
                <div>
                    {this.renderEditComment()}
                </div>
            );
        }
    }
    renderEditDeleteButtons(){
        const currUserId = localStorage.getItem('currUserId');
        if (currUserId === this.props.user.id) {
            return(
                <div className="buttonsList">
                    <Button  variant="outline-light" size="sm" onClick = {this.handleEditClick}>
                        Edit Comment
                    </Button>
                    <Button  variant="outline-light" size="sm" onClick = {this.handleDeleteClick}>
                        Delete Comment
                    </Button>
                </div>
            );
        }
    }

    render(){
        return (   
            <div>  
                {this.renderViewOrEditComment()}
            </div>  
        );
    }
}

export default Comment; 
import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import { Nav, Form, Button, Row, Col  } from "react-bootstrap";
import {deletePost} from '../api/posts.js';
import {createReaction} from '../api/reactions.js';


class Post extends Component{
    constructor(props) {
        super(props)
        this.state ={
            reaction: {},
            redirect: ''
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
      }
    handleDeleteClick= (e)=> {
        e.preventDefault();
        let data = deletePost(this.props.post.id);
        data.then(result=>{
            if(result.error)
                alert(result.error);
        });
    }
    handleEditClick= (e)=> {
        e.preventDefault();
        this.state.redirect = "/posts/"+ this.props.post.id + "/edit";
        this.forceUpdate()
    }
    handleChange = (event) => {
        this.setState(prevState => {
            let reaction = Object.assign({}, prevState.reaction);
            reaction[event.target.name] = event.target.value; 
            return { reaction };                                
        })
    }
    handleSubmit= (e)=> {
        e.preventDefault();
        const postId = this.props.post.id;
        let data = createReaction(postId, this.state.reaction);
        data.then(result=>{
            if(result.error)
                alert(result.error);    
        });
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

        const userName = this.props.user.attributes.first_name+" "+this.props.user.attributes.last_name;
        const commentsPath = "/posts/"+this.props.post.id+"/comments";
        const reactionsPath = "/posts/"+this.props.post.id+"/reactions";
        if (profilePath=="/profile"){
            return (   
                <div className = "posts"> 
                    <Nav className="flex-column">
                        <Nav.Link href={profilePath} className="userName">{userName}</Nav.Link>
                        <div className ="content">
                            <h1 className ="data">{this.props.post.attributes.caption}</h1>
                        </div>
                    </Nav>
                    <div className="buttonsList">
                    <Form.Group controlId="formBasicGender">
                        <Form.Control as="select" name = "reaction_type" onChange={this.handleChange} style={{ width: 60 }} onClick={this.handleSubmit} >
                            <option>Like</option>
                            <option>Love</option>
                            <option>Haha</option>
                            <option>Care</option>
                            <option>Sad</option>
                        </Form.Control>
                    </Form.Group>
                    <Link to={commentsPath}>
                        <Button variant="outline-light" size="sm" className="button">
                            Show Comments
                        </Button>
                    </Link>
                    <Link to={reactionsPath} >
                        <Button variant="outline-light" size="sm" className="button">
                            Show Reactions
                        </Button>
                    </Link>
                    <Button  variant="outline-light" size="sm" onClick = {this.handleEditClick} className="button">
                        Edit Post
                    </Button>
                    <Button  variant="outline-light" size="sm" onClick = {this.handleDeleteClick} className="button">
                        Delete Post
                    </Button>
                </div>
            </div>  
        );}else{
            return (   
                <div className = "posts"> 
                    <Nav className="flex-column">
                        <Nav.Link href={profilePath} className="userName">{userName}</Nav.Link>
                        <div className ="content">
                            <h1 className ="data">{this.props.post.attributes.caption}</h1>
                        </div>
                    </Nav>
                    <div className="buttonsList">
                    <Form.Group controlId="formBasicGender">
                        <Form.Control as="select" name = "reaction_type" onChange={this.handleChange} style={{ width: 60 }} onClick={this.handleSubmit} >
                            <option>Like</option>
                            <option>Love</option>
                            <option>Haha</option>
                            <option>Care</option>
                            <option>Sad</option>
                        </Form.Control>
                    </Form.Group>
                    <Link to={commentsPath}>
                        <Button variant="outline-light" size="sm" className="button">
                            Show Comments
                        </Button>
                    </Link>
                    <Link to={reactionsPath} >
                        <Button variant="outline-light" size="sm" className="button">
                            Show Reactions
                        </Button>
                    </Link>
                </div>
            </div> );
        }

    }
}

export default Post;
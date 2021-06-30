import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Nav, Form, Button} from "react-bootstrap";
import {deletePost} from '../api/posts.js';
import {updatePost} from '../api/posts.js';
import {createReaction} from '../api/reactions.js';


class Post extends Component{
    constructor(props) {
        super(props)
        this.state ={
            post: this.props.post,
            reaction: {},
            mode: "view"
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
      }
    handleDeleteClick= (e)=> {
        e.preventDefault();
        let data = deletePost(this.state.post.id);
        data.then(result=>{
            if(result.error)
                alert(result.error);
            else
                this.setState({mode:"deleted"});   
        });
    }
    handleEditClick= (e)=> {
        e.preventDefault();
        this.setState({mode: "edit"});
    }
    handleChangeReaction = (event) => {
        this.setState(prevState => {
            let reaction = Object.assign({}, prevState.reaction);
            reaction[event.target.name] = event.target.value; 
            return { reaction };                                
        })
    }
    handleChangePost = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post);
            post.attributes[event.target.name] = event.target.value; 
            return { post };                                
        })
    }
    handleSubmitReaction= (e)=> {
        e.preventDefault();
        const postId = this.props.post.id;
        let data = createReaction(postId, this.state.reaction);
        data.then(result=>{
            if (result){
                if(result.error)
                    alert(result.error);  
            }  
        });
    }
    handleUpdatePost= (e)=> {
        e.preventDefault()
        let data = updatePost(this.state.post);
        data.then(result=>{
            if (result){
                if (result.error)
                    alert(result.error);
                else
                    this.setState({post: result.data, mode: "view"});
            }
        });
    }
    renderViewOrEditPost(){
        if(this.state.mode=="view"){
            return(
                <div>
                    {this.renderViewPost()}
                </div>
            );
        }else if (this.state.mode=="edit"){
            return(
                <div>
                    {this.renderEditPost()}
                </div>
            );
        }
    }
    renderViewPost(){
        const currUserId = localStorage.getItem('currUserId');
        const userName = this.props.user.attributes.first_name+" "+this.props.user.attributes.last_name;
        var profilePath;

        if (currUserId == this.props.user.id)
             profilePath = "/profile";
        else
            profilePath = "/profile/"+this.props.user.id;

        
        return(
            <div className = "posts"> 
            <Nav className="flex-column">
                <Nav.Link href={profilePath} className="userName">{userName}</Nav.Link>
                <div className ="content">
                    <h1 className ="data">{this.state.post.attributes.caption}</h1>
                </div>
            </Nav>
            <div className="buttonsList">
            <Form.Group controlId="formBasicGender">
                <Form.Control as="select" name = "reaction_type" onChange={this.handleChangeReaction} style={{ width: 60 }} onClick={this.handleSubmitReaction} >
                    <option>Like</option>
                    <option>Love</option>
                    <option>Haha</option>
                    <option>Care</option>
                    <option>Sad</option>
                </Form.Control>
            </Form.Group>
            {this.renderEditDeleteButtons()}
            </div>
        </div> 
        );
    }
    renderEditPost(){
        const userName = this.props.user.attributes.first_name+" "+this.props.user.attributes.last_name;
        const profilePath = "/profile";
        return(
            <div className = "posts"> 
            <Nav className="flex-column">
                <Nav.Link href={profilePath} className="userName">{userName}</Nav.Link>
            </Nav>
            <Form onSubmit={this.handleUpdatePost}>
                <Form.Group controlId="formBasicFirstName" className ="content">
                    <Form.Control type="textarea" name = "caption" value= {this.state.post.attributes.caption}  style={{ height: 200 , textAlign:"center"}}  onChange={this.handleChangePost} />
                </Form.Group> 
    
                <Form.Group controlId="formBasicGender" className="button">
                    <Form.Label>Public</Form.Label>
                    <Form.Control as="select" name = "is_public" value= {this.state.post.attributes.is_public} onChange={this.handleChangePost} style={{ width: 60 }}  >
                        <option>True</option>
                        <option>False</option>
                    </Form.Control>
                </Form.Group>
                <div className = "buttonsList">
                    <Button variant="primary" type="submit" className="button">
                        Update Post
                    </Button>
                </div>
            </Form>
            </div>
            );
    }

    renderEditDeleteButtons(){
        const currUserId = localStorage.getItem('currUserId');
        const commentsPath = "/posts/"+this.props.post.id+"/comments";
        const reactionsPath = "/posts/"+this.props.post.id+"/reactions";
        if (currUserId == this.props.user.id) {
            return(
                <div>
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
            );
        }else{
            return(
                <div>
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
            );
        }

    }
    
    render(){
        return (   
            <div> 
                {this.renderViewOrEditPost()}
            </div>
        );

    }
}

export default Post;
import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";


class Post extends Component{
    constructor(props) {
        super(props)
        this.state ={
            redirect: ''
        }
        this.renderComments.bind(this);
      }
    renderComments(){
        console.log("here");
        //this.setState({ redirect: "/2/posts/:16/comments" });
        //this.forceUpdate()
        
    }  
    
    render(){
        const currUserId = localStorage.getItem('currUserId');
        var profilePath;
        if (currUserId == this.props.user.id)
             profilePath = "/profile";
        else
            profilePath = "/profile/"+this.props.user.id;

        const userName = this.props.user.first_name+" "+this.props.user.last_name;
        const commentsPath = "/posts/"+this.props.post.id+"/comments";
        const reactionsPath = "/posts/"+this.props.post.id+"/reactions";
        if (this.state.redirect) {
            return(
                <div>
                    <Redirect to={this.state.redirect} />
                </div>
            )   
        }
        return (   
            <div> 
                <Nav className="flex-column">
                    <Nav.Link href={profilePath}>{userName}</Nav.Link>
                    <h2>{this.props.post.caption}</h2>
                </Nav>
                
                <Link to={commentsPath}>
                    <Button variant="outline-light" size="sm">
                        Show Comments
                    </Button>
                </Link>
                <Link to={reactionsPath}>
                    <Button variant="outline-light" size="sm">
                        Show Reactions
                    </Button>
                </Link>
            </div>  
        );
    }
}

export default Post;
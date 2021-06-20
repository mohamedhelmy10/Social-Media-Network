import React, { Component } from 'react'
import { Nav } from "react-bootstrap";

class Comment extends Component{
    constructor(props) {
        super(props)
    }
    
    render(){
        const currUserId = localStorage.getItem('currUserId');
        const profilePath = "/"+currUserId+"/profile/"+this.props.user.id;
        const userName = this.props.user.first_name+" "+this.props.user.last_name;
        return (   
            <div>  
                <Nav className="flex-column">
                    <Nav.Link href={profilePath}>{userName}</Nav.Link>
                </Nav>
                <h2>{this.props.comment.body}</h2>
            </div>  
        );
    }
}

export default Comment;  
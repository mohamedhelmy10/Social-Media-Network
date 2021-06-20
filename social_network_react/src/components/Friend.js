import React, { Component } from 'react'
import { Nav } from "react-bootstrap";

class Friend extends Component{
    constructor(props) {
        super(props)
    }
    
    render(){
        const currUserId = localStorage.getItem('currUserId');
        const profilePath = "/"+currUserId+"/profile/"+this.props.friend.id;
        const userName = this.props.friend.first_name+" "+this.props.friend.last_name;
        return (   

            <Nav className="flex-column">
                <Nav.Link href={profilePath}>{userName}</Nav.Link>
            </Nav>
        );
    }
}

export default Friend;  
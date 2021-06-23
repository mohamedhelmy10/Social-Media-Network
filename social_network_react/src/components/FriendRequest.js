import React, { Component } from 'react'
import { Nav, Button, Row, Col} from "react-bootstrap";
import {removeRequestOrFriend} from "../api/friends.js";
import {acceptFriendRequest} from "../api/friends.js";


class FriendRequest extends Component{
    constructor(props) {
        super(props)
        this.handleAcceptClick = this.handleAcceptClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this); 
    }

    handleAcceptClick= (e)=> {
        e.preventDefault();
        acceptFriendRequest.call(this,this.props.invitation.id);
    }

    handleRemoveClick= (e)=> {
        e.preventDefault();
        removeRequestOrFriend.call(this,this.props.invitation.id)
    }

    render(){
        const currUserId = localStorage.getItem('currUserId');
        var profilePath;
        if (currUserId == this.props.friend.id)
             profilePath = "/profile";
        else
             profilePath = "/profile/"+this.props.friend.id;

        const userName = this.props.friend.first_name+" "+this.props.friend.last_name;
        return (   
            <div>
                <Row>
                    <Col>
                        <Nav className="flex-column">
                            <Nav.Link href={profilePath} className="userName">{userName}</Nav.Link>
                        </Nav>
                    </Col>
                    <Col>
                        <div className="buttonsList">
                            <Button  variant="outline-light" size="sm" onClick = {this.handleAcceptClick}>
                                Accept
                            </Button>;
                            <Button  variant="outline-light" size="sm" onClick = {this.handleRemoveClick}>
                                Remove
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default FriendRequest;  
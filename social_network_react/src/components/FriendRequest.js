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
        let data = acceptFriendRequest(this.props.friend.id);
        data.then(result=>{
            if (result.error)
                alert(result.error)    
        });
    }

    handleRemoveClick= (e)=> {
        e.preventDefault();
        let data = removeRequestOrFriend(this.props.friend.id);
        data.then(result=>{
            if (result.error)
                alert(result.error);
        });
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
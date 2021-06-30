import React, { Component } from 'react'
import { Nav, Button, Row, Col} from "react-bootstrap";
import {removeRequestOrFriend} from "../api/friends.js"


class Friend extends Component{
    constructor(props) {
        super(props)
        this.state={
            status:""
        }
        this.handleRemoveClick = this.handleRemoveClick.bind(this); 
    }


    handleRemoveClick= (e)=> {
        e.preventDefault();
        let data = removeRequestOrFriend(this.props.friend.id);
        data.then(result=>{
            if (result){
                if (result.error)
                    alert(result.error);
                else
                    this.setState({status:"declined"});
            }
        });
    }

    render(){
        if(this.state.status=="declined"){
            return (   
                <div> 
                </div>
            );
        }
            
        const currUserId = localStorage.getItem('currUserId');
        var profilePath;
        if (currUserId == this.props.friend.id)
             profilePath = "/profile";
        else
             profilePath = "/profile/"+this.props.friend.id;

        const userName = this.props.friend.attributes.first_name+" "+this.props.friend.attributes.last_name;
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

export default Friend;  
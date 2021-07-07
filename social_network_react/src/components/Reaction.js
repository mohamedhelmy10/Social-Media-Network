import React, { Component } from 'react'
import { Nav, Form, Button, Row, Col  } from "react-bootstrap";
import {deleteReaction, updateReaction} from '../api/reactions.js';

class Reaction extends Component{
    constructor(props) {
        super(props)
        this.state ={
            reaction: this.props.reaction,
            status: ""
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }
    handleChange = (event) => {
        this.setState(prevState => {
            let reaction = Object.assign({}, prevState.reaction);
            reaction[event.target.name] = event.target.value; 
            return { reaction };                                
        })
    }
    handleDeleteClick= (e)=> {
        e.preventDefault();
        deleteReaction(this.state.reaction.attributes.post_id, this.state.reaction.id);
        this.setState({status:"declined"});
    }
    handleEditClick= (e)=> {
        e.preventDefault();
        let data = updateReaction(this.state.reaction);
        data.then(result=>{
            if(result.error)
                alert(result.error); 
            else 
                this.setState({reaction:result.data});
        });
    }
    renderDeleteButton(){
        const currUserId = localStorage.getItem('currUserId');
        if (currUserId===this.props.user.id){
            return(
                <Col>
                    <Button  variant="outline-light" size="sm" onClick = {this.handleDeleteClick} className="button">
                        Delete
                    </Button>
                </Col>
            );
        }
    }
    
    render(){ 
        if(this.state.status==="declined"){
            return (   
                <div>  
                </div>
            );
        }
        
        const currUserId = localStorage.getItem('currUserId');
        var profilePath;
        if (currUserId === this.props.user.id)
             profilePath = "/profile";
        else
             profilePath = "/profile/"+this.props.user.id;

        const userName = this.props.user.attributes.first_name+" "+this.props.user.attributes.last_name;
        return (   
            <div className="reaction"> 
                <Row className="buttonsList">
                    <Col>
                        <Nav className="flex-column">
                            <Nav.Link href={profilePath} className="button">{userName}</Nav.Link>
                        </Nav>
                    </Col>
                    <Col>
                    <Form.Group controlId="formBasicGender">
                        <Form.Control as="select" name = "reaction_type" value= {this.state.reaction.attributes.reaction_type} onChange={this.handleChange} style={{ width: 60 }} onClick={this.handleEditClick} >
                            <option disabled selected value>like</option>
                            <option>Like</option>
                            <option>Love</option>
                            <option>Haha</option>
                            <option>Care</option>
                            <option>Sad</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>
                    {this.renderDeleteButton()} 
                </Row>
            </div>  
        );
    }
}

export default Reaction;  
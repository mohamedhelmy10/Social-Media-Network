import React, { Component } from 'react'
import { Nav , Row, Col} from "react-bootstrap";

 class Reaction extends Component{
    constructor(props) {
        super(props)
    }
    
    render(){
        const currUserId = localStorage.getItem('currUserId');
        const profilePath = "/"+currUserId+"/profile/"+this.props.user.id;
        const userName = this.props.user.first_name+" "+this.props.user.last_name;
        return (   
            <div> 
                <Row>
                    <Col>
                        <Nav className="flex-column">
                            <Nav.Link href={profilePath}>{userName}</Nav.Link>
                        </Nav>
                    </Col>
                    <Col>
                        <p>{this.props.reaction.reaction_type}</p>
                    </Col>
                </Row>
            </div>  
        );
    }
}

export default Reaction;  
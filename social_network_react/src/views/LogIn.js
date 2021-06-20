import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Bar from './Bar.js';
import {userLogin} from '../api/users.js';

class LogIn extends Component{
    constructor(props) {
        super(props)
        this.state = 
        {
            user:{
                email: '',
                password: ''
            },
            redirect: ''
           
        }
      }
    
      handleChange = (event) => {
        this.setState(prevState => {
            let user = Object.assign({}, prevState.user);
            user[event.target.name] = event.target.value; 
            return { user };                                
        })
      }

      handleSubmit= (e)=> {
        e.preventDefault()
        userLogin.call(this);
      }

      componentDidMount() {
        localStorage.removeItem('currUserId');
        localStorage.clear();
      }

    render(){
        if (this.state.redirect) {
            return(
                <div>
                <Redirect to={this.state.redirect} />
            </div>

            )
            
        }
        return (
            <div>
                <Bar/>
            <Form className="logInForm" onSubmit={this.handleSubmit}>
                <h3>Log In</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name = "email" onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name = "password" onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            </div>
        )
    }
}

export default LogIn;
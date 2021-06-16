import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from 'axios'

class SignUp extends Component{
    constructor(props) {
        super(props)
        this.state = {
          user: {
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              phone_number: '',
              gender: true,
              birthdate: '',
              profile_picture: '',
              hometown: '',
              marital_status: false,
              about_me: ''
          }
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
        //const user =this.state.user

        axios.post('http://localhost:3000/api/v1/users', this.state.user)
        .then((response) => {
            //console.log(this.state.user);
            console.log(response);
          }, (error) => {
            console.log(error);
        })
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
      }
    render(){
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Milner" name = "first_name" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Henderson" name ="last_name" onChange={this.handleChange} />
                </Form.Group> 

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" name = "email" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name = "password" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="5843577" name = "phone_number" onChange={this.handleChange} />
                </Form.Group> 

                <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" name = "gender" onChange={this.handleChange} >
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicBirthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control type="date" placeholder="01/01/2000" name = "birthdate" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Profile Picture" name = "profile_picture" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicHometown">
                    <Form.Label>Hometown</Form.Label>
                    <Form.Control type="text" placeholder="Alexandria-Egypt" name = "hometown" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicMaritalStatus">
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Control as="select" name = "marital_status" onChange={this.handleChange} >
                        <option>Single</option>
                        <option>Married</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicAbout">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control type="text" placeholder="Hi, I am Milner" name = "about_me" onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign up
                </Button> 
            </Form>
        )
    }
}

export default SignUp;
import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router';
import {updatePost, getPost} from '../api/posts.js';
import  HomeBar from '../views/homeBar.js';

class EditPostForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            post: {},
            redirect: ''
        }
    }
    handleChange = (event) => {

        this.setState(prevState => {
            let post = Object.assign({}, prevState.post);
            post[event.target.name] = event.target.value; 
            return { post };                                
        })
    }
    handleSubmit= (e)=> {
        e.preventDefault()
        let data = updatePost(this.state.post);
        data.then(result=>{
            if (result.error)
                alert(result.error);
            else
                this.setState({redirect:"/home"});
        });
    }

    componentDidMount(){
        const postId = this.props.match.params.postId;
        let data = getPost(postId);
        data.then(result=>{
            if(result.error)
                alert(result.error);
            else
                this.setState({post:result.data});
        });
    }
    
    render(){
        if (this.state.redirect){
            return (<Redirect to = {this.state.redirect}/>);
        }
        return(
        <div>
            <HomeBar/>
        <div className="col-md-4" className="posts">
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
                <Form.Control type="textarea" value= {this.state.post.caption}  style={{ height: 200 , textAlign:"center"}}  name = "caption" onChange={this.handleChange} />
            </Form.Group> 

            <Form.Group controlId="formBasicGender">
                <Form.Label>Public</Form.Label>
                <Form.Control as="select" name = "is_public" value= {this.state.post.is_public} onChange={this.handleChange} style={{ width: 60 }}  >
                    <option>True</option>
                    <option>False</option>
                </Form.Control>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Update Post
            </Button> 
        </Form>
        </div>
        </div>
        );
    }
}

export default EditPostForm ;  
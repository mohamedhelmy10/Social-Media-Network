import React, { Component } from 'react'
import Post from '../components/Post.js';
import { Form, Button } from "react-bootstrap";
import  HomeBar from './homeBar.js';
import {getProfilePosts} from '../api/posts.js';
import {createPost} from '../api/posts.js';

class MyProfile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            postsAndUser: []
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem('currUserId');
        getProfilePosts.call(this, userId);
    }

    renderPosts() {
        const user = this.state.postsAndUser[0];
        return this.state.postsAndUser.map((post, index) => (
                (index !=0)&&
                <div>
                    <Post key={index} post={post} user = {user}/>
                </div>
        ));
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
        createPost.call(this)
    }


    render(){
        return (
            <div>
                <HomeBar/>
            <div className="col-md-4" className="posts">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Control type="textarea" placeholder="Write what you think"  style={{ height: 200 , textAlign: 'center'}}  name = "caption" onChange={this.handleChange} />
                </Form.Group> 

                <Form.Group controlId="formBasicGender">
                    <Form.Label>Public</Form.Label>
                    <Form.Control as="select" name = "is_public" onChange={this.handleChange} style={{ width: 60 }}>
                        <option>True</option>
                        <option>False</option>
                    </Form.Control>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Add Post
                </Button> 
            </Form>
            </div>
                {this.renderPosts()}
            
            </div>
        );
    }
}

export default MyProfile;
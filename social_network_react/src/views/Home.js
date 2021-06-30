import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import Post from '../components/Post.js';
import  HomeBar from './homeBar.js';
import {getPosts} from '../api/posts.js';
import {createPost} from '../api/posts.js';

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            postsAndUsers: [],
            post: {}
        }
    }
    
    componentDidMount() {
        let data = getPosts();
        data.then(result=>{
            console.log(result)
            if (result){
                if(result.error)
                    alert(result.error);
                else
                    this.setState({postsAndUsers: result}); 
            }
        });
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
        let data = createPost(this.state.post);
        data.then(result=>{
            if (result){
                if(result.error)
                    alert(result.error);
                else{
                    console.log(this.state.postsAndUsers);
                    var newPostsAndUsers = this.state.postsAndUsers;
                    newPostsAndUsers.push(result);
                    this.setState({postsAndUsers: newPostsAndUsers, post:{}});
                }
            }
        });
    }

    renderPosts() {
        return this.state.postsAndUsers.map((postAndUser, index) => (
            <div>
                <Post key={index} post={postAndUser.post.data} user={postAndUser.user.data}/>
            </div>
        ));
    }


    render(){
        return (
            <div>
                <HomeBar/>
            <div className="col-md-4" className="posts">
            <Form  id="create-post-form" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Control type="textarea" placeholder="Write what you think" style={{ height: 200, textAlign: 'center' }} name="caption" onChange={this.handleChange} />
                </Form.Group> 
                <Form.Group controlId="formBasicGender">
                    <Form.Label>Public</Form.Label>
                    <Form.Control as="select"  name = "is_public" onChange={this.handleChange} style={{ width: 60 }}  >
                        <option value="true" selected="selected">True</option>
                        <option value="false">False</option>
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

export default Home;
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
            postsAndUser: [],
            post:{}
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem('currUserId');
        let data = getProfilePosts(userId);
        data.then(result=>{
            if (result){
                if(result.error)
                    alert(result.error);
                else
                    this.setState({postsAndUser: result}); 
            }
        });
    }

    renderPosts() {
        const user = this.state.postsAndUser[0];
        return this.state.postsAndUser.map((post, index) => (
                (index !=0)&&
                <div>
                    <Post key={index} post={post.data} user = {user.data}/>
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
        let data = createPost(this.state.post);
        data.then(result=>{
            if (result){
                if(result.error)
                    alert(result.error);
                else{
                    var newPostsAndUser = this.state.postsAndUser;
                    newPostsAndUser.push(result);
                    this.setState({postsAndUser: newPostsAndUser, post:{}});
                }
            }
        });
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
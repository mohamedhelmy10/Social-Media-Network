import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import Post from '../components/Post.js';

class Feed extends Component{
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    getPosts() {
        axios.get('http://localhost:3000/api/v1/users/'+this.props.userId+'/posts')
        .then(response => {
          this.setState({posts: response.data});
        })
        .catch(error => console.log(error))
      }
    
    componentDidMount() {
        this.getPosts();
    }

    renderPost() {
        return this.state.posts.map((post, index) => (
            <Post key={index} post={post}/>
        ));
    }
    render(){
        return (
            <div className="col-md-4">
                <div className="col-md-5">
                    <div className="form-area">  
                        <form role="form">
                            <br styles="clear:both" />             
                            <div className="form-group">
                                <textarea className="form-control" type="textarea" id="caption" placeholder="Start a post" cols="50" rows="10" ></textarea>
                            </div>                   
                            <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
                        </form>
                    </div>
                </div>
                {this.renderPost()}
            </div>
        );
    }
}

export default Feed;
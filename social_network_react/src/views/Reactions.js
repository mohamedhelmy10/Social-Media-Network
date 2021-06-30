import React, { Component } from 'react';
import  HomeBar from './homeBar.js';
import {getReactions} from '../api/reactions.js'
import Reaction from '../components/Reaction.js';

class Reactions extends Component{
    constructor(props) {
        super(props)
        this.state = {
            reactionsAndUsers: []
        }   
    }
    
    componentDidMount() {
        const postId = this.props.match.params.postId;
        let data = getReactions(postId );
        data.then(result=>{
            if(result.error)
                alert(result.error);
            else
                this.setState({reactionsAndUsers: result}); 
        });
    }


    renderReaction() {
        return this.state.reactionsAndUsers.map((reactionAndUser, index) => (
            <div>
                <Reaction key={index} reaction={reactionAndUser.reaction.data} user= {reactionAndUser.user.data}/>
            </div>
        ));
    }
    render(){
        return (
            <div>
                <HomeBar/>
                {this.renderReaction()}
            </div>
        );
    }
}

export default Reactions;

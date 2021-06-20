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
        getReactions.call(this,postId );
    }


    renderReaction() {
        return this.state.reactionsAndUsers.map((reactionAndUser, index) => (
            <div>
                <Reaction key={index} reaction={reactionAndUser.reaction} user= {reactionAndUser.user}/>
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

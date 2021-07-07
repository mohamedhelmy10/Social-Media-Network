import React, { Component } from 'react';
import {getReactions} from '../api/reactions.js'
import Reaction from '../components/Reaction.js';
import { Redirect } from "react-router-dom";
import Bar from './Bar.js'; 

class Reactions extends Component{
    constructor(props) {
        super(props)
        this.state = {
            reactionsAndUsers: [],
            redirect:""
        }   
    }
    
    componentDidMount() {
        if (localStorage.getItem('currUserId')){
            const postId = this.props.postId;
            let data = getReactions(postId );
            data.then(result=>{
                if (result){
                    if(result.error)
                        alert(result.error);
                    else
                        this.setState({reactionsAndUsers: result}); 
                }
            });
        }else
            this.setState({redirect: '/log-in'});
    }


    renderReaction() {
        return this.state.reactionsAndUsers.map((reactionAndUser) => (
            <div key={reactionAndUser.reaction.data.id} >
                <Reaction reaction={reactionAndUser.reaction.data} user= {reactionAndUser.user.data}/>
            </div>
        ));
    }
    render(){
        if (this.state.redirect) {
            return(
                <div>
                     <Bar/>
                    <Redirect to={this.state.redirect} />
                </div>
            );     
        }
        return (
            <div>
                {this.renderReaction()}
            </div>
        );
    }
}

export default Reactions;

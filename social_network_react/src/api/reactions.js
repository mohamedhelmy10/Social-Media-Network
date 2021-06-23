import axios from 'axios';

export function getReactions(postId) {
    const currUserId = localStorage.getItem('currUserId');
    axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions")
    .then(response => {
        this.setState({reactionsAndUsers: response.data});
    })
    .catch(error => console.log(error))
}


export function createReaction(postId){
    const currUserId = localStorage.getItem('currUserId');
    axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions", {reaction: this.state.reaction})
    .then((response) => {
        if (response.data.error)
            alert(response.data.error);
      })
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    });
}

export function deleteReaction(postId, reactionId){
    const currUserId = localStorage.getItem('currUserId');
    axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions/"+reactionId)
    .then((response) => {
        if (response.data.error)
            alert(response.data.error);
        else{
          const path = window.location.pathname; 
          this.setState({ redirect: path }); 
          this.forceUpdate();
        }
      })
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    });
  }

  export function updateReaction(reaction){
    const currUserId = localStorage.getItem('currUserId');
    axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+reaction.post_id+"/reactions/"+reaction.id, reaction)
    .then((response) => {
        if (response.data.error)
            alert(response.data.error);
        else{
          const path = window.location.pathname; 
          this.setState({ redirect: path }); 
          this.forceUpdate();
        }
      })
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    });
  }

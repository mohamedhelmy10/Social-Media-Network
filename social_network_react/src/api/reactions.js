import axios from 'axios';

export async function getReactions(postId) {
    try {
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions");
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
}


export async function createReaction(postId, newReaction){
    try {
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions", {reaction: newReaction});
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
}

export async function deleteReaction(postId, reactionId){
    try {
        const currUserId = localStorage.getItem('currUserId');
        await axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions/"+reactionId);
    } catch (error) {
        alert(error);
    }
  }

  export async function updateReaction(reaction){
    try {
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+reaction.attributes.post_id+"/reactions/"+reaction.id, reaction);
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
  }
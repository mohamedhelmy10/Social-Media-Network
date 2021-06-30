import axios from 'axios';

export async function getReactions(postId) {
    try {
        const token = localStorage.getItem('token');
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions",{
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
}


export async function createReaction(postId, newReaction){
    try {
        const token = localStorage.getItem('token');
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions",{reaction: newReaction},{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
}

export async function deleteReaction(postId, reactionId){
    try {
        const token = localStorage.getItem('token');
        const currUserId = localStorage.getItem('currUserId');
        await axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions/"+reactionId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
    } catch (error) {
        alert(error);
    }
  }

  export async function updateReaction(reaction){
    try {
        const token = localStorage.getItem('token');
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+reaction.attributes.post_id+"/reactions/"+reaction.id, reaction,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
  }
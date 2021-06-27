import axios from 'axios';

export async function getComment(postId, commentId) {
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments/"+commentId);
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  }
}

export async function getComments(postId) {
  try {
    const currUserId = localStorage.getItem('currUserId');
    let response = await axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments");
    let data = await response.data;
    return data;
  } catch (error) {
    alert(error);
  }
}

export async function createComment(postId, newComment){
    try {
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments", {comment: newComment});
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
}

export async function deleteComment(postId, commentId){
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments/"+commentId);
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  }
}

  export async function updateComment(comment){
    try {
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+comment.post_id+"/comments/"+comment.id, comment);
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
  }


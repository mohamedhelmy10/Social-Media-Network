import axios from 'axios';

export async function getComments(postId) {
  try {
    const token = localStorage.getItem('token');
    const currUserId = localStorage.getItem('currUserId');
    let response = await axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments",{
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

export async function createComment(postId, newComment){
    try {
        const token = localStorage.getItem('token');
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments", {comment: newComment},{
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

export async function deleteComment(postId, commentId){
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments/"+commentId,{
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

  export async function updateComment(comment){
    try {
        const token = localStorage.getItem('token');
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+comment.attributes.post_id+"/comments/"+comment.id, comment.attributes,{
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


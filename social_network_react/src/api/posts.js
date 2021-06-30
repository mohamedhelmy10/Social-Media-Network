import axios from 'axios'

export async function getPosts() {
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts',{
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

export async function getProfilePosts(userId){
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts/profile/'+userId,{
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

export async function createPost(newPost){
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts", {post: newPost},{
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

export async function deletePost(postId){
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      let data = await response.data;
      return data;
  } catch(error){
      alert(error);
  }
}


export async function updatePost(post){
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+post.id, post.attributes,{
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
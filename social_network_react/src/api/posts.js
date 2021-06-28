import axios from 'axios'


export async function getPost(postId) {
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts/'+postId);
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  }
}

export async function getPosts() {
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts');
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  }
}

export async function getProfilePosts(userId){
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts/profile/'+userId);
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  }
}

export async function createPost(newPost){
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts", {post: newPost});
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  }
}

export async function deletePost(postId){
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId);
      let data = await response.data;
      return data;
  } catch(error){
      alert(error);
  }
}


export async function updatePost(post){
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+post.id, post);
      let data = await response;
      return data;
  } catch (error) {
      alert(error);
  }
}
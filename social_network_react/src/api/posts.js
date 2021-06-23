import axios from 'axios'


export function getPost(postId) {
  const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts/'+postId)
    .then((response) => {
      if (response.data.error)
          alert(response.data.error);
      else{
        this.setState({post: response.data});
      }
    })
    .catch(error => console.log(error))
}


export function getPosts() {
  const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts')
    .then((response) => {
      if (response.data.error)
          alert(response.data.error);
      else{
        this.setState({postsAndUsers: response.data});
      }
    })
    .catch(error => console.log(error))
}


export function getProfilePosts(userId){
  const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts/profile/'+userId)
   .then((response) => {
    if (response.data.error)
        alert(response.data.error);
    else{
      this.setState({postsAndUser: response.data});
    }
  })
  .catch(error => console.log(error))
}

export function createPost(){
  const currUserId = localStorage.getItem('currUserId');
  axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts", {post: this.state.post})
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


export function deletePost(postId){
  const currUserId = localStorage.getItem('currUserId');
  axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId)
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


export function updatePost(post){
  const currUserId = localStorage.getItem('currUserId');
  axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+post.id, post)
  .then((response) => {
      if (response.data.error)
          alert(response.data.error);
      else{
          const path = "/home"
          this.setState({ redirect: path });       
          this.forceUpdate();
      }
    })
  .catch(error => {
      this.setState({ errorMessage: error.message });
      console.error('There was an error!', error);
  });
}
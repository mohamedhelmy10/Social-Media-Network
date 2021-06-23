import axios from 'axios';

export function getComment(postId, commentId) {
  const currUserId = localStorage.getItem('currUserId');
  axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments/"+commentId)
  .then((response) => {
    if (response.data.error)
        alert(response.data.error);
    else{
      this.setState({comment: response.data});
    }
  })
  .catch(error => console.log(error))
}

export function getComments(postId) {
    const currUserId = localStorage.getItem('currUserId');
    axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments")
    .then((response) => {
      if (response.data.error)
          alert(response.data.error);
      else{
        this.setState({commentsAndUsers: response.data});
      }
    })
    .catch(error => console.log(error))
}

export function createComment(postId){
    const currUserId = localStorage.getItem('currUserId');
    axios.post("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments", {comment: this.state.comment})
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

export function deleteComment(postId, commentId){
    const currUserId = localStorage.getItem('currUserId');
    axios.delete("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments/"+commentId)
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

  export function updateComment(comment){
    const currUserId = localStorage.getItem('currUserId');
    axios.put("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+comment.post_id+"/comments/"+comment.id, comment)
    .then((response) => {
        if (response.data.error)
            alert(response.data.error);
        else{
            const path = "/posts/"+comment.post_id+"/comments";
            this.setState({ redirect: path });       
            this.forceUpdate();
        }
      })
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    });
  }


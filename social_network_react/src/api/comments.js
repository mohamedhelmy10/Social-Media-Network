import axios from 'axios';
export function getComments(postId) {
    const currUserId = localStorage.getItem('currUserId');
    axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/comments")
    .then(response => {
        this.setState({commentsAndUsers: response.data});
    })
    .catch(error => console.log(error))
}
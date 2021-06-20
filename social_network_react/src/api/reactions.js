import axios from 'axios';
export function getReactions(postId) {
    const currUserId = localStorage.getItem('currUserId');
    axios.get("http://localhost:3000/api/v1/users/"+currUserId+"/posts/"+postId+"/reactions")
    .then(response => {
        console.log(response.data);
        this.setState({reactionsAndUsers: response.data});
    })
    .catch(error => console.log(error))
    }
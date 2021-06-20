import axios from 'axios'

export function getPosts() {
  const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts')
    .then(response => {
      this.setState({postsAndUsers: response.data});
    })
    .catch(error => console.log(error))
}
export function getProfilePosts(userId){
  const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/posts/profile/'+userId)
    .then(response => {
      this.setState({postsAndUser: response.data})
   })
  .catch(error => console.log(error))
}
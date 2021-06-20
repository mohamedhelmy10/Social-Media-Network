import axios from 'axios';

export function getFriends() {
    const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/friends')
    .then(response => {
      this.setState({friends: response.data});
    })
    .catch(error => console.log(error));
}

export function getRequests() {
    const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations')
    .then(response => {
      this.setState({requests: response.data});
      console.log(this.state.requests);
    })
    .catch(error => console.log(error));
}
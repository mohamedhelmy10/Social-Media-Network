import axios from 'axios';

export function getFriends() {
    const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/friends')
    .then((response) => {
      if (response.data.error)
          alert(response.data.error);
      else{
        this.setState({friends: response.data});
      }
    })
    .catch(error => console.log(error));
}

export function getRequests() {
    const currUserId = localStorage.getItem('currUserId');
    axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations')
    .then((response) => {
      if (response.data.error)
          alert(response.data.error);
      else{
        this.setState({requests: response.data});
      }
    })
    .catch(error => console.log(error));

}
export function removeRequestOrFriend(friendId) {
  const currUserId = localStorage.getItem('currUserId');
  axios.put('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/destroy/'+friendId)
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

export function acceptFriendRequest(friendId) {
  const currUserId = localStorage.getItem('currUserId');
  axios.put('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/'+friendId)
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

export function sendFriendRequest(friendId) {
  const currUserId = localStorage.getItem('currUserId');
  axios.post('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/'+friendId)
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
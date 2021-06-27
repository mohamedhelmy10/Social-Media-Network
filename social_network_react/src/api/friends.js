import axios from 'axios';

export async function getFriends() {
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/friends');
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  } 
}

export async function getRequests() {
    try {
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations');
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
}
export async function removeRequestOrFriend(friendId) {
  try {
      console.log(friendId);
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.put('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/destroy/'+friendId);
      let data = await response.data;
      return data;  
  } catch (error) {
      alert(error);
  }
}

export async function acceptFriendRequest(friendId) {
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.put('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/'+friendId);
      let data = await response.data;
      return data;
  } catch (error) {
    alert(error);
  }
}

export async function sendFriendRequest(friendId) {
  try {
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.post('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/'+friendId);
      let data = await response.data;
      return data;
  } catch (error) {
      alert(error);
  }
}
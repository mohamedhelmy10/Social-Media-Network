import axios from 'axios';

export async function getFriends() {
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/friends',{
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

export async function getRequests() {
    try {
        const token = localStorage.getItem('token');
        const currUserId = localStorage.getItem('currUserId');
        let response = await axios.get('http://localhost:3000/api/v1/users/'+currUserId+'/invitations',{
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
export async function removeRequestOrFriend(friendId) {
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.put('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/destroy/'+friendId,{},{
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

export async function acceptFriendRequest(friendId) {
  try {
      const token = localStorage.getItem('token');
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.put('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/'+friendId,{},{
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

export async function sendFriendRequest(friendId) {
  try {
      const token = localStorage.getItem('token');
      console.log(token);
      const currUserId = localStorage.getItem('currUserId');
      let response = await axios.post('http://localhost:3000/api/v1/users/'+currUserId+'/invitations/'+friendId,{},{
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
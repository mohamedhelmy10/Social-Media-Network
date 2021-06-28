import axios from 'axios';
import Friend from '../components/Friend';
import { currUser } from './users';

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
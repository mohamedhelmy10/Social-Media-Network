import axios from 'axios'

export var currUser;

export async function createUser(newUser){
    try {
        let response = await axios.post('http://localhost:3000/api/v1/users', {user: newUser});
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error)
    }
}

export async function userLogin(loginUser) {
    try {
        let response = await axios.post('http://localhost:3000/api/v1/users/login', loginUser);
        let data = await response.data;
        return data;
    } catch (error) {
        alert(error);
    }
}
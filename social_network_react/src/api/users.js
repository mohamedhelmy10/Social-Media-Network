import axios from 'axios'

export var currUser;

export function createUser(){
    axios.post('http://localhost:3000/api/v1/users', {user: this.state.user})
    .then((response) => {
        if (response.data.error)
            alert(response.data.error);
        else{
            this.setState({ redirect: "/log-in" });
            this.forceUpdate();
        }
      })
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    });
}

export function userLogin() {
    axios.post('http://localhost:3000/api/v1/users/login', this.state.user)
    .then((response) => {   
        if (response.data.error)
            alert(response.data.error);
        else{
            setCurrentUser(response.data.user);
            localStorage.setItem('currUserId', response.data.user.id);
            this.setState({ redirect: "/home" });
            this.forceUpdate();
        }
      })
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    });
}



export function setCurrentUser(user){
    currUser = user;
}

export function getCurrentUser(){
    return currUser;
}
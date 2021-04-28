import axios from 'axios';

const USER_API_BASE_URL = "http://10.0.2.2:8087/api/public/";

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL + "allUsers");
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL + "createUser", user);
    }

    getUserByEmail(email){
        return axios.get(USER_API_BASE_URL + 'users' + '/' + 'email' + '/' + email);
    }

    verifyUser(email, password){
        return axios.get(USER_API_BASE_URL + 'login' + '/' + email + '&' + password);
    }

    updateUser(user, email){
        return axios.put(USER_API_BASE_URL + 'updateUser' + '/' + email, user);
    }

    deleteUser(username){
        return axios.delete(USER_API_BASE_URL + 'deleteUser' + '/' + username);
    }

    sendEmail(email){
        return axios.post(USER_API_BASE_URL + 'sendEmail' + '/' + email)
    }
}

export default new UserService()
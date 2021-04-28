import axios from 'axios';

const USER_API_BASE_URL = "http://10.0.2.2:8087/api/admin/";

class AdminService {

    banUser( email ){
        return axios.put(USER_API_BASE_URL + 'banUser' + '/' + email);
    }

    unBanUser( email ){
        return axios.put(USER_API_BASE_URL + 'unBanUser' + '/' + email);
    }
}

export default new AdminService()
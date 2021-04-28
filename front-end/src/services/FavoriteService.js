import axios from 'axios';

const RECIPE_API_BASE_URL = "http://10.0.2.2:8087/api/favorite";

class FavoriteService {

    getFavorites(email){
        return axios.get(RECIPE_API_BASE_URL + '/' + "allFavorites" + "/" + email);
    }

    addToFavorites(email, id){
      return axios.put(RECIPE_API_BASE_URL + '/' + "addFavorite" + "/" + email + "&" + id);
    }

    removeFavorite(email, id){
        return axios.delete(RECIPE_API_BASE_URL + '/' + "removeFavorite" + "/" + email + "&" + id);
    }

}

export default new FavoriteService()

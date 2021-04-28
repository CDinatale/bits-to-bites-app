import axios from 'axios';

const INGREDIENT_API_BASE_URL = "http://10.0.2.2:8087/api/ingredient/";

class IngredientService {

    getIngredients(){
        return axios.get(INGREDIENT_API_BASE_URL + "allIngredients");
    }

    createIngredient(ingredient){
        return axios.post(INGREDIENT_API_BASE_URL + "createIngredient", ingredient);
    }

    getIngredientByName(name){
        return axios.get(INGREDIENT_API_BASE_URL + 'findIngredient' + '/' + name);
    }

    updateIngredient(ingredient, name){
        return axios.put(INGREDIENT_API_BASE_URL + 'updateIngredient' + '/' + name, ingredient);
    }

    deleteIngredient(name){
        return axios.delete(INGREDIENT_API_BASE_URL + 'deleteIngredient' + '/' + name);
    }
}

export default new IngredientService()
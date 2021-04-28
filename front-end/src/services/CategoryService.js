import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://10.0.2.2:8087/api/category";

class CategoryService {

    getCategories(){
        return axios.get(CATEGORY_API_BASE_URL + '/' + "allCategories");
    }

    createCategory(category){
        return axios.post(CATEGORY_API_BASE_URL + '/' + "createCategory", category);
    }

    getCategoryByName(name){
        return axios.get(CATEGORY_API_BASE_URL + '/' + 'findCategories' + '/' + name);
    }

    updateCategory(category, name){
        return axios.put(CATEGORY_API_BASE_URL + '/' + 'updateCategory' + '/' + name, category);
    }

    deleteCategory(name){
        return axios.delete(CATEGORY_API_BASE_URL + '/' + 'deleteCategory' + '/' + name);
    }
}

export default new CategoryService()
import axios from 'axios';

const RECIPE_API_BASE_URL = "http://10.0.2.2:8087/api/uploadedRecipes";

class UploadService {

    createRecipes(recipe){
        var url = RECIPE_API_BASE_URL + '/' + "createRecipe";

        return axios.post(url, recipe,{
          "headers": {
            "content-type": "application/json",
          },
        })

    }

}

export default new UploadService()

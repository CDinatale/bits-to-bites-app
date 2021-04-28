package com.capstone.project.controllers;

import com.capstone.project.exception.ResourceNotFoundException;
import com.capstone.project.model.Ingredient;
import com.capstone.project.model.Recipe;
import com.capstone.project.model.RecipeToIngredient;
import com.capstone.project.model.UploadedRecipe;
import com.capstone.project.services.UploadedRecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("api/uploadedRecipes")
public class UploadedRecipeController {
    private final UploadedRecipeService uploadedRecipeService;

    public UploadedRecipeController(UploadedRecipeService uploadedRecipeService) {
        this.uploadedRecipeService = uploadedRecipeService;
    }


    //get all recipes api
    @GetMapping("allRecipes")
    public Set<UploadedRecipe> allRecipes(){
        return this.uploadedRecipeService.findAll();
    }

    //add ingredient to recipe
    @GetMapping("addIngredientToRecipe/{recipe}&{ingredient}")
    public UploadedRecipe addIngredientToRecipe(@PathVariable RecipeToIngredient ingredient, @PathVariable UploadedRecipe recipe){
        return this.uploadedRecipeService.addIngredientToRecipe(ingredient, recipe);
    }

    // get recipe by id rest api
    @GetMapping("/getRecipe/{id}")
    public UploadedRecipe getRecipeById(@PathVariable Long id) {
        UploadedRecipe recipe = uploadedRecipeService.findById(id);
        if(recipe == null){
            throw new ResourceNotFoundException("There is no recipe with id" + id);
        }
        return recipe;
    }

    // create recipe rest api
    @PostMapping("/createRecipe")
    public UploadedRecipe createRecipe(@RequestBody UploadedRecipe recipe) {
        return uploadedRecipeService.save(recipe);
    }


    // update recipe rest api
    @PutMapping("/updateRecipe/{id}")
    public UploadedRecipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipeDetails) {

        UploadedRecipe recipe = uploadedRecipeService.findById(id);
        if(recipe == null){
            throw new ResourceNotFoundException("There is no recipe with id" + id);
        }
        recipe.setCookTime(recipeDetails.getCookTime());
        recipe.setDirections(recipeDetails.getDirections());
        recipe.setImageUrl(recipeDetails.getImageUrl());
        recipe.setLevel(recipeDetails.getLevel());
        recipe.setPrepTime(recipeDetails.getPrepTime());
        recipe.setName(recipeDetails.getName());
        recipe.setServings(recipeDetails.getServings());
        recipe.setTotalTime(recipeDetails.getTotalTime());
        return uploadedRecipeService.save(recipe);
    }

    // delete recipe rest api
    @DeleteMapping("/deleteRecipe/{id}")
    public Map< String, Boolean > deleteRecipe(@PathVariable Long id) {
        UploadedRecipe recipe = uploadedRecipeService.findById(id);
        if(recipe == null){
            throw new ResourceNotFoundException("There is no recipe with id" + id);
        }
        uploadedRecipeService.delete(recipe);
        Map < String, Boolean > response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}

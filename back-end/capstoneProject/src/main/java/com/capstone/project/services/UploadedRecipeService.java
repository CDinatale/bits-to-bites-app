package com.capstone.project.services;

import com.capstone.project.model.Ingredient;
import com.capstone.project.model.RecipeToIngredient;
import com.capstone.project.model.UploadedRecipe;
import com.capstone.project.repositories.UploadedRecipeRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UploadedRecipeService implements UploadedRecipeServiceAbs{

    private final UploadedRecipeRepository uploadedRecipeRepository;

    public UploadedRecipeService(UploadedRecipeRepository uploadedRecipeRepository) {
        this.uploadedRecipeRepository = uploadedRecipeRepository;
    }


    @Override
    public UploadedRecipe save(UploadedRecipe uploadedRecipe) {
        return uploadedRecipeRepository.save(uploadedRecipe);
    }

    @Override
    public UploadedRecipe addIngredientToRecipe(RecipeToIngredient ingredient, UploadedRecipe uploadedRecipe) {
        uploadedRecipe.addIngredientItem(ingredient);
        return save(uploadedRecipe);
    }

    @Override
    public Set<UploadedRecipe> findAll() {
        Set<UploadedRecipe> recipes = new HashSet<>(uploadedRecipeRepository.findAll());
        return recipes;
    }

    @Override
    public UploadedRecipe findById(Long id) {
        return uploadedRecipeRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UploadedRecipe recipe) {
        uploadedRecipeRepository.delete(recipe);
    }

    @Override
    public void deleteById(Long aLong) {
        uploadedRecipeRepository.deleteById(aLong);
    }
}

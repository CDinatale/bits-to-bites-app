package com.capstone.project.services;

import com.capstone.project.model.Ingredient;
import com.capstone.project.model.Recipe;
import com.capstone.project.model.RecipeToIngredient;
import com.capstone.project.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class RecipeService implements RecipeServiceAbs{

    @Autowired
    RecipeRepository recipeRepository;

    @Override
    public Set<Recipe> findAll() {
        Set<Recipe> recipes = new HashSet<>(recipeRepository.findAll());
        return recipes;
    }

    @Override
    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Recipe recipe) {
        recipeRepository.delete(recipe);
    }

    @Override
    public void deleteById(Long aLong) {
        recipeRepository.deleteById(aLong);
    }

    @Override
    public Recipe save(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe addIngredientToRecipe(RecipeToIngredient ingredient, Recipe recipe) {
        recipe.addIngredientItem(ingredient);
        return save(recipe);
    }

    @Override
    public Recipe findByName(String name) {
        return recipeRepository.findByName(name);
    }

    @Override
    public Set<Recipe> findAllByName(String name) {
        return recipeRepository.findAllByName(name);
    }
}

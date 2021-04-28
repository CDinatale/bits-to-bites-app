package com.capstone.project.services;
import com.capstone.project.model.Ingredient;
import com.capstone.project.model.Recipe;
import com.capstone.project.model.RecipeToIngredient;

import java.util.Set;


public interface RecipeServiceAbs extends CrudService<Recipe, Long>{
    Recipe save(Recipe recipe);

    Recipe addIngredientToRecipe(RecipeToIngredient ingredient, Recipe recipe);

    Recipe findByName(String name);

    Set<Recipe> findAllByName(String name);
}

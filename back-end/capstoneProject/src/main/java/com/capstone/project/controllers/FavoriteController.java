package com.capstone.project.controllers;

import com.capstone.project.exception.ResourceNotFoundException;
import com.capstone.project.model.Pantry;
import com.capstone.project.model.Recipe;
import com.capstone.project.model.User;
import com.capstone.project.services.RecipeService;
import com.capstone.project.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api/favorite")
public class FavoriteController {

    private final UserService userService;
    private final RecipeService recipeService;

    public FavoriteController(UserService userService, RecipeService recipeService){
        this.userService = userService;
        this.recipeService = recipeService;
    }

    //add favourite
    @PutMapping("/addFavorite/{email}&{id}")
    public User addFavorite(@PathVariable String email, @PathVariable long id) {
        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + email);
        }
        Recipe recipe = recipeService.findById(id);
        if(recipe == null){
            throw new ResourceNotFoundException("There is no ingredient with id" + id);
        }
        user.addFavoritesItem(recipe);
        return userService.save(user);
    }

    //delete favourite
    @DeleteMapping("/removeFavorite/{email}&{id}")
    public User addIngredientPantry(@PathVariable String email, @PathVariable long id) {
        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + email);
        }
        Recipe recipe = recipeService.findById(id);
        if(recipe == null){
            throw new ResourceNotFoundException("There is no ingredient with id" + id);
        }
        user.removeFavoritesItem(recipe);
        return userService.save(user);
    }


    //get all favourites
    @GetMapping("allFavorites/{email}")
    public Set<Recipe> allPantry(@PathVariable String email){
        User user = userService.findByEmail(email);
        return user.getFavorites();
    }

}

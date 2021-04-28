package com.capstone.project.controllers;

import com.capstone.project.exception.ResourceNotFoundException;
import com.capstone.project.model.Ingredient;
import com.capstone.project.model.Pantry;
import com.capstone.project.model.User;
import com.capstone.project.services.IngredientService;
import com.capstone.project.services.PantryService;
import com.capstone.project.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("api/pantry")
public class PantryController {

    private final UserService userService;
    private final IngredientService ingredientService;
    private final PantryService pantryService;

    public PantryController(UserService userService, IngredientService ingredientService, PantryService pantryService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
        this.pantryService = pantryService;
    }


    //add ingredient to pantry for specific id
    @PutMapping("/addIngredient/{email}&{id}")
    public User addIngredientPantry(@PathVariable String email, @PathVariable long id) {
        Pantry pantryItem = new Pantry();
        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + email);
        }
        Ingredient ingredient = ingredientService.findById(id);
        if(ingredient == null){
            throw new ResourceNotFoundException("There is no ingredient with id" + id);
        }
        pantryItem.setIngredient(ingredient);
        pantryItem.setCategory(ingredient.getCategory());
        user.addIngredientItem(pantryItem);
        return userService.save(user);
    }


    //get all pantry ingredients by email api
    @GetMapping("allPantry/{email}")
    public Set<Pantry> allPantry(@PathVariable String email){
        User user = userService.findByEmail(email);
        return user.getPantryIngredients();
    }

    //delete a pantry item by its id
    @DeleteMapping("deletePantry/{id}&{email}")
    public Map<String, Boolean> deletePantryItem(@PathVariable Long id, @PathVariable String email){
        Pantry pantryItem = pantryService.findById(id);
        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + email);
        }
        if(pantryItem == null){
            throw new ResourceNotFoundException("There is no pantry with id" + id);
        }
        user.removePantryItem(pantryItem);
        userService.save(user);
        Map < String, Boolean > response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    //update a pantry item by its id
    @GetMapping("updatePantry/{email}&{id}&{expiry}")
    public User updatePantryItem(@PathVariable String email, @PathVariable String expiry, @PathVariable Long id){

        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + email);
        }
        Set<Pantry> pantryItemSet = user.getPantryIngredients();
        for (Pantry pantryItem: pantryItemSet) {
            if(pantryItem.getId() == id){
                pantryItem.setExpiryDate(expiry);
            }
        }
        return userService.save(user);
    }

}

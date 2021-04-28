package com.capstone.project.services;

import com.capstone.project.model.Ingredient;
import com.capstone.project.repositories.IngredientRepository;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class IngredientService implements IngredientServiceAbs{

    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public Set<Ingredient> findAll() {
        Set<Ingredient> ingredients = new HashSet<>(ingredientRepository.findAll());
        return ingredients;
    }

    @Override
    public Ingredient findById(Long aLong) {
        return ingredientRepository.findById(aLong).orElse(null);
    }

    @Override
    public void delete(Ingredient object) {
        ingredientRepository.delete(object);
    }


    @Override
    public void deleteById(Long aLong) {
        ingredientRepository.deleteById(aLong);
    }

    @Override
    public Ingredient findByName(String name) {
        return ingredientRepository.findByName(name);
    }

    @Override
    public Ingredient save(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }
}

package com.capstone.project.repositories;

import com.capstone.project.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Recipe findByName(String name);

    Set<Recipe> findAllByName(String name);


}

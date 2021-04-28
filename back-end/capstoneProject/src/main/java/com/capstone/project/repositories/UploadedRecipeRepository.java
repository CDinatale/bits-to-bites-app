package com.capstone.project.repositories;
import com.capstone.project.model.UploadedRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadedRecipeRepository extends JpaRepository<UploadedRecipe, Long> {
}

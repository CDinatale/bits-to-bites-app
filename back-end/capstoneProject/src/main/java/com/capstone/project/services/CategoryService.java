package com.capstone.project.services;

import com.capstone.project.model.Category;
import com.capstone.project.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CategoryService implements CategoryServiceAbs{
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Set<Category> findAll() {
        return new HashSet<>(categoryRepository.findAll());
    }

    @Override
    public Category findById(Long aLong) {
        return categoryRepository.findById(aLong).orElse(null);
    }

    @Override
    public void delete(Category object) {
        categoryRepository.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        categoryRepository.deleteById(aLong);
    }
}

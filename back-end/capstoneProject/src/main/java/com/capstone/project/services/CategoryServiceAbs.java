package com.capstone.project.services;

import com.capstone.project.model.Category;

public interface CategoryServiceAbs extends CrudService<Category, Long>{
    Category findByName(String name);

    Category save(Category category);

}

package com.capstone.project.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Ingredient {
    //properties
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false, name="name")
    private String name;

    @Column(nullable = false, name="category")
    private String category;

    public Ingredient(long id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    public Ingredient() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}

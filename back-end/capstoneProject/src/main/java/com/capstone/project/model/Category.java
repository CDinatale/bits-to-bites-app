package com.capstone.project.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Category {
    //properties
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false, name="name")
    private String name;


    public Category(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Category() {

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

}

package com.capstone.project.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {

    //properties
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false, name="username")
    private String username;

    @Column(nullable = false, name = "email")
    private String email;

    @Column(nullable = false, name="password")
    private String password;

    @Column(name="status")
    private String status;

    @Column(name="role")
    private String role;

    @OneToMany(cascade = {CascadeType.ALL})
    private Set<Pantry> pantryIngredients = new HashSet<Pantry>();

    @ManyToMany
    private Set<Recipe> favorites;


    //getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Pantry> getPantryIngredients() {
        return pantryIngredients;
    }

    public void setPantryIngredients(Set<Pantry> pantryIngredients) {
        this.pantryIngredients = pantryIngredients;
    }

    public void addIngredientItem(Pantry item){
        this.pantryIngredients.add(item);
    }

    public void removePantryItem(Pantry item){
        this.pantryIngredients.remove(item);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<Recipe> getFavorites() {
        return favorites;
    }

    public void setFavorites(Set<Recipe> favorites) {
        this.favorites = favorites;
    }

    public void addFavoritesItem(Recipe item){
        this.favorites.add(item);
    }

    public void removeFavoritesItem(Recipe item){
        this.favorites.remove(item);
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}

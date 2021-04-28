package com.capstone.project.model;
import org.hibernate.annotations.Type;
import javax.persistence.*;
import java.util.Set;

@Entity
public class Recipe {

    //properties
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false, name="name")
    private String name;

    @Column(nullable = false, name="cooktime")
    private String cookTime;

    @Column(nullable = false, name="preptime")
    private String prepTime;

    @Column(nullable = false, name="totaltime")
    private String totalTime;

    @Column(nullable = false, name="level")
    private String level;

    @Column(nullable = false, name="servings")
    private String servings;

    @Type(type = "text")
    @Column(nullable = false, name="directions", length=5000)
    private String directions;

    @Column(nullable = false, name="image_url")
    private String imageUrl;

    @ManyToMany
    private Set<Category> linkedCategories;

    @OneToMany(cascade = {CascadeType.ALL})
    private Set<RecipeToIngredient> recipeToIngredients;

    public Recipe(long id, String name, String cookTime, String prepTime, String totalTime,
                  String level, String servings, String directions, String imageUrl,
                  Set<Category> linkedCategories, Set<RecipeToIngredient> recipeToIngredients) {
        this.id = id;
        this.name = name;
        this.cookTime = cookTime;
        this.prepTime = prepTime;
        this.totalTime = totalTime;
        this.level = level;
        this.servings = servings;
        this.directions = directions;
        this.imageUrl = imageUrl;
        this.linkedCategories = linkedCategories;
        this.recipeToIngredients = recipeToIngredients;
    }

    public Recipe() {

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

    public String getCookTime() {
        return cookTime;
    }

    public void setCookTime(String cookTime) {
        this.cookTime = cookTime;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }

    public String getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(String totalTime) {
        this.totalTime = totalTime;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getServings() {
        return servings;
    }

    public void setServings(String servings) {
        this.servings = servings;
    }

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Set<Category> getLinkedCategories() {
        return linkedCategories;
    }

    public void setLinkedCategories(Set<Category> linkedCategories) {
        this.linkedCategories = linkedCategories;
    }

    public Set<RecipeToIngredient> getRecipeToIngredients() {
        return recipeToIngredients;
    }

    public void setRecipeToIngredients(Set<RecipeToIngredient> recipeToIngredients) {
        this.recipeToIngredients = recipeToIngredients;
    }

    public void addIngredientItem(RecipeToIngredient item){
        this.recipeToIngredients.add(item);
    }

    public void addCategoryItem(Category item){
        linkedCategories.add(item);
    }
}

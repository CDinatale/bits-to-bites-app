package com.capstone.project.model;



import javax.persistence.*;



@Entity

public class RecipeToIngredient {

    @ManyToOne
    private Ingredient ingredient;


    @Column
    private Double usCustomaryWeight;


    @Column
    private Double metricWeight;


    @Column
    private String usCustomaryUnitType;


    @Column
    private String metricUnitType;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    public RecipeToIngredient(){



    }

    public RecipeToIngredient(Ingredient ingredient, Double USCustomaryWeight, Double metricWeight, String usCustomaryUnitType, String metricUnitType, long id) {

        this.ingredient = ingredient;

        this.usCustomaryWeight = USCustomaryWeight;

        this.metricWeight = metricWeight;

        this.usCustomaryUnitType = usCustomaryUnitType;

        this.metricUnitType = metricUnitType;

        this.id = id;

    }


    public Ingredient getIngredient() {

        return ingredient;

    }


    public void setIngredient(Ingredient ingredient) {

        this.ingredient = ingredient;

    }


    public Double getUsCustomaryWeight() {

        return usCustomaryWeight;

    }


    public void setUsCustomaryWeight(Double usCustomaryWeight) {

        this.usCustomaryWeight = usCustomaryWeight;

    }


    public Double getMetricWeight() {

        return metricWeight;

    }


    public void setMetricWeight(Double metricWeight) {

        this.metricWeight = metricWeight;

    }


    public String getUsCustomaryUnitType() {

        return usCustomaryUnitType;

    }


    public void setUsCustomaryUnitType(String usCustomaryUnitType) {

        this.usCustomaryUnitType = usCustomaryUnitType;

    }


    public String getMetricUnitType() {

        return metricUnitType;

    }


    public void setMetricUnitType(String metricUnitType) {

        this.metricUnitType = metricUnitType;

    }


    public long getId() {

        return id;

    }


    public void setId(long id) {

        this.id = id;

    }

}
package com.example.stationary.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")  // MongoDB collection name
public class Product {

    @Id  // MongoDB primary key
    private String id;

    private String name;
    private double price;

    // No-argument constructor
    public Product() {}

    // Constructor with parameters
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}

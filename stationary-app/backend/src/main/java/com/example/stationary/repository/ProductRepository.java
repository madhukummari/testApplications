package com.example.stationary.repository;

import com.example.stationary.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
    // String is used because MongoDB's _id is typically a String/ObjectId
}

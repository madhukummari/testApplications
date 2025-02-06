package com.example.stationary;

import com.example.stationary.model.Product;  // Import the Product entity
import com.example.stationary.repository.ProductRepository;  // Import the ProductRepository
import org.springframework.boot.CommandLineRunner;  // Import CommandLineRunner
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;  // Import Bean annotation

@SpringBootApplication
public class StationaryApplication {

    public static void main(String[] args) {
        SpringApplication.run(StationaryApplication.class, args);
    }

    // CommandLineRunner bean to insert data when the application starts
    @Bean
    public CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {
            // Insert sample products into the in-memory database
            productRepository.save(new Product("Pen", 1.5));
            productRepository.save(new Product("Notebook", 2.0));
            productRepository.save(new Product("Eraser", 0.5));

            // Log confirmation message to the console
            System.out.println("Sample products have been added.");
        };
    }
}

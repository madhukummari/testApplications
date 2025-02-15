package com.example.stationary;

import com.example.stationary.model.Product;
import com.example.stationary.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StationaryApplication {

    public static void main(String[] args) {
        SpringApplication.run(StationaryApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {
            productRepository.deleteAll(); // Clear existing data (optional)
            
            productRepository.save(new Product("Pen", 1.5));
            productRepository.save(new Product("Notebook", 2.0));
            productRepository.save(new Product("Eraser", 0.5));
            productRepository.save(new Product("Slate", 2.0));

            System.out.println("Sample products added to MongoDB.");
        };
    }
}

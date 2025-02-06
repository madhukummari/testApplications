// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // New state to handle loading
  const [error, setError] = useState(null);  // New state to handle errors

  useEffect(() => {
    // Fetching the products from the Spring Boot backend API
    fetch('http://localhost:8080/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Stop loading if there's an error
      });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product List</h1>
      </header>
      <div className="product-list">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error fetching products: {error.message}</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './logo.svg'; // Make sure logo.svg is in the src folder

// Home Page
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <img src={logo} alt="Madhu Stationery Logo" className="logo" />
        <h1>Madhu Stationery</h1>
      </header>
      <div className="home-content">
        <h2 className="big-title">Welcome to Madhu Stationery</h2>
        <p>Your one-stop shop for all stationery needs!</p>
        <button onClick={() => navigate('/products')}>See Products</button>
        <button onClick={() => navigate('/add-product')} style={{ marginTop: '10px' }}>
          ➕ Add Product
        </button>
      </div>
    </div>
  );
};

// Products Page
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Madhu Stationery Logo" className="logo" />
        <h1>Madhu Stationery</h1>
      </header>

      <button className="back-button" onClick={() => navigate('/')}>🏠 Back to Home</button>
      <button className="add-button" onClick={() => navigate('/add-product')}>➕ Add New Product</button>

      <h2>Our Products</h2>
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

// Add Product Page
const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      price: parseFloat(price)
    };

    fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add product');
        return res.json();
      })
      .then(() => {
        alert('Product added!');
        navigate('/products');
      })
      .catch((err) => alert('Error: ' + err.message));
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Product name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          value={price}
          placeholder="Product price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <button onClick={() => navigate('/products')} style={{ marginTop: '10px' }}>
        Back to Products
      </button>
    </div>
  );
};

// ✅ Main App Component with Routes
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;

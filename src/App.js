import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductForm from "./components/ProductForm";
import ProductEdit from "./components/ProductEdit";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    availability: true,
    rating: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://fake-store-api.mock.beeceptor.com/api/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product created: ", data);
        navigate("/products");
      })
      .catch((error) => console.error("Error creating product:", error));
  };

  return (
    <div>
      <h1 className="font-bold text-xl mt-2">Add Product</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="py-1">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 mx-1"
          />
        </div>
        <br />
        <div className="py-1">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 mx-1"
          />
        </div>
        <br />
        <div className="py-1">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 mx-1"
          />
        </div>
        <br />
        <div className="py-1">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="border p-2 mx-1"
          />
        </div>
        <br />
        <label>Availability:</label>
        <input
          type="checkbox"
          name="availability"
          checked={product.availability}
          onChange={(e) =>
            setProduct({ ...product, availability: e.target.checked })
          }
          className="border p-2 mx-1"
        />
        <br />
        <div className="py-1 mt-2">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="border p-2 mx-1"
          />
        </div>
        <br />
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          className="border p-2 mx-1"
          step="0.1"
          max="5"
          min="0"
        />
        <br />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
          Add Product
        </button>
        <p className="font-thin mt-2">
          POST request not configured for the mock API
        </p>
      </form>
    </div>
  );
}

export default ProductForm;

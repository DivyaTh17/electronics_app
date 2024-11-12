import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fake-store-api.mock.beeceptor.com/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching details", error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <img src={product.image || "fallback-image-url.jpg"} alt={product.name} />
      <h1 className="text-2xl">{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Availability: {product.availability ? "In Stock" : "Out of Stock"}</p>
      <p>Rating: {product.rating}</p>
    </div>
  );
}

export default ProductEdit;

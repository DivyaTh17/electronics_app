// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch("https://fake-store-api.mock.beeceptor.com/api/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products", error));
//   }, []);

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleDelete = (product_id) => {
//     console.log("Product ID to delete:", product_id); // Log the ID to console

//     if (window.confirm("Are you sure to delete this product?")) {
//       //SImulating delete method
//       fetch(
//         `https://fake-store-api.mock.beeceptor.com/api/products/${product_id}`,
//         {
//           method: "DELETE",
//         }
//       )
//         .then(() => {
//           setProducts(
//             products.filter((product) => product.product_id !== product_id)
//           );
//         })
//         .catch((error) => console.error("Error deleting product:", error));
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl">Products</h1>
//       <div className="flex justify-between">
//         <input
//           type="text"
//           className="border p-2 my-2"
//           placeholder="Search Products"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <Link to="/add-product">
//           <button className="bg-blue-500 text-white p-2 mb-4">
//             Add New Product
//           </button>
//         </Link>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//         {filteredProducts.map((product) => (
//           <div key={product.product_id} className="border p-4">
//             <h2 className="text-lg">{product.name}</h2>
//             <img
//               src={product.image || "fallback-image-url.jpg"}
//               alt={product.name}
//               className="h-48 w-full object-cover"
//             />
//             <p>Price: ${product.price}</p>
//             <button
//               className="bg-red-500 text-white mt-2 p-2"
//               onClick={() => handleDelete(product.product_id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../productsSlice";
import { Link } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (product_id) => {
    dispatch(deleteProduct(product_id));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl">Products</h1>
      <div className="flex justify-between">
        <input
          type="text"
          className="border p-2 my-2"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/add-product">
          <button className="bg-blue-500 text-white p-2 mb-4">
            Add New Product
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {filteredProducts.map((product) => (
          <div key={product.product_id} className="border p-4">
            <img
              src={product.image || "fallback-image-url.jpg"}
              alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button
              onClick={() => handleDelete(product.product_id)}
              className="bg-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../Common Pages/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication Pages/context"; // Adjust the path if necessary

const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth] = useAuth(); // Access auth context

  useEffect(() => {
    console.log("Auth state in Products:", auth); // Log the auth state
    if (auth?.token) {
      getAdminProducts();
    } else {
      console.log("No token available, skipping API call");
      toast.error("Please log in as an admin.");
    }
  }, [auth?.token]);

  const getAdminProducts = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-928q.onrender.com/ProductRoutes/get-admin-products"); // Token is in axios defaults
      console.log("API Response:", data);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", {
        message: error.message,
        response: error.response ? error.response.data : "No response data",
        status: error.response ? error.response.status : "No status",
      });
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/Dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`https://e-commerce-backend-928q.onrender.com/ProductRoutes/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
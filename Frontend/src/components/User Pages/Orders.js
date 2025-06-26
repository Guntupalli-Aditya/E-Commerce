import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import Layout from "../Common Pages/Layout";
import axios from "axios";
import { useAuth } from "../Authentication Pages/context.js";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-928q.onrender.com/AuthRoutes/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders?.map((o, i) => {
                const product = o.products[0]; // Single product per order entry
                const isUnavailable = product?.unavailable;
                return (
                  <div className="border shadow" key={o._id}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>Cash on Delivery</td>
                          <td>1</td> {/* Quantity is always 1 per entry */}
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {isUnavailable ? (
                        <div className="row mb-2 p-3 card flex-row">
                          <div className="col-md-12">
                            <p>Product Not Available</p>
                          </div>
                        </div>
                      ) : product?._id ? (
                        <div className="row mb-2 p-3 card flex-row" key={product._id}>
                          <div className="col-md-4">
                            <img
                              src={`https://e-commerce-backend-928q.onrender.com/ProductRoutes/product-photo/${product._id}`}
                              className="card-img-top"
                              alt={product.name || "Product"}
                              width="100px"
                              height={"100px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <p>{product.name || "N/A"}</p>
                            <p>{product.description?.substring(0, 30) || "No description"}</p>
                            <p>Price: {product.price || "N/A"}</p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
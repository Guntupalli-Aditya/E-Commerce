import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../Common Pages/Layout";
import axios from "axios";
import { useAuth } from "../Authentication Pages/context.js";
import moment from "moment";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [selectedStatus, setSelectedStatus] = useState({});

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-928q.onrender.com/AuthRoutes/all-orders");
      console.log("Fetched orders:", data); // Log the fetched orders for debugging
      setOrders(data);
      // Initialize selectedStatus for each order
      const initialStatus = data.reduce((acc, order) => {
        acc[order._id] = order.status;
        return acc;
      }, {});
      setSelectedStatus(initialStatus);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const status = selectedStatus[orderId];
      const { data } = await axios.put(
        `https://e-commerce-backend-928q.onrender.com/AuthRoutes/order-status/${orderId}`,
        { status }
      );
      toast.success(`Order status updated to ${status}`);
      getOrders(); // Refresh the order list
    } catch (error) {
      console.log("Error updating status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <Layout title={"All Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders?.map((o, i) => {
                const hasAvailableProducts = o.products.some((p) => !p.unavailable);
                return (
                  <div className="border shadow" key={i}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <select
                              value={selectedStatus[o._id] || o.status}
                              onChange={(e) => handleStatusChange(o._id, e.target.value)}
                              className="form-control"
                            >
                              <option value="Not Process">Not Process</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipping">Shipping</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancel">Cancel</option>
                            </select>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>Cash on Delivery</td>
                          <td>{o?.products.filter((p) => !p.unavailable).length}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleUpdateStatus(o._id)}
                            >
                              Update Status
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {hasAvailableProducts ? (
                        o?.products?.map((p, i) => {
                          if (p?.unavailable) {
                            return (
                              <div className="row mb-2 p-3 card flex-row" key={i}>
                                <div className="col-md-12">
                                  <p>Product Not Available</p>
                                </div>
                              </div>
                            );
                          }
                          if (!p._id) {
                            return null; // Skip invalid products
                          }
                          return (
                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                              <div className="col-md-4">
                                <img
                                  src={`https://e-commerce-backend-928q.onrender.com/ProductRoutes/product-photo/${p._id}`}
                                  className="card-img-top"
                                  alt={p.name || "Product"}
                                  width="100px"
                                  height={"100px"}
                                />
                              </div>
                              <div className="col-md-8">
                                <p>{p.name || "N/A"}</p>
                                <p>{p.description?.substring(0, 30) || "No description"}</p>
                                <p>Price: {p.price || "N/A"}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="p-3">This order contains no available products.</p>
                      )}
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

export default AdminOrders;
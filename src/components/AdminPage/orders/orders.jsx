import React, { useState, useEffect } from "react";
import '../dashobard/AdminPage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]); // State for orders
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://bluz-backend.onrender.com/api/orders");
        console.log(response.data);
        setOrders(response.data); // Set fetched orders to state
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Admin Panel</h1>
        </div>
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            <li className="sidebar-nav-item">
              <a href="/dashboard" className="sidebar-nav-link">
                <span className="icon">🏠</span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="sidebar-nav-item">
              <a href="/orders" className="sidebar-nav-link">
                <span className="icon">📦</span>
                <span>Orders</span>
              </a>
            </li>
            <li className="sidebar-nav-item">
              <a href="/settings" className="sidebar-nav-link">
                <span className="icon">⚙️</span>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="header">
          <h2 className="header-title">Orders</h2>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="orders-table">
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Product</th>
                   
                    <th className="table-cell">Quantity</th>
                    <th className="table-cell">Total</th>
                    <th className="table-cell">Name</th>

                    <th className="table-cell">Email</th>
                    <th className="table-cell">Phone</th>
                    <th className="table-cell">Action</th>


                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="table-row">
                      <td className="table-cell">{order.product}</td>
                     
                      <td className="table-cell">{order.quantity}</td>
                      <td className="table-cell">{order.total} dt</td> 
                      <td className="table-cell">{order.name}</td>

                      <td className="table-cell">{order.email}</td>
                      <td className="table-cell">{order.phone}</td>
                      <td className="table-cell">
                        <button className="table-button">View</button>
                        <button className="table-button delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminOrdersPage;

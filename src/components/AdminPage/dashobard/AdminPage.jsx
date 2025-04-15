import React, { useState, useEffect } from "react";
import './AdminPage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle popup visibility
  const [successPopup, setSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    colors: [{ name: "", images: null }], // Initialize with one color
  });
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate("/add-product");
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://bluz-backend.onrender.com/api/products?category=women");
        console.log(response.data);
        setProducts(response.data); // Set fetched products to state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchProducts();
  }, []);


  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://bluz-backend.onrender.com/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)); // Remove deleted product from state
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("colors")) {
      const colors = [...formData.colors];
      colors[index][name.split(".")[1]] = value;
      setFormData((prevState) => ({
        ...prevState,
        colors,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle file input changes for color images
  const handleFileChange = (e, index) => {
    const files = e.target.files;
    const colors = [...formData.colors];
    colors[index].images = files;
    setFormData((prevState) => ({
      ...prevState,
      colors,
    }));
  };

  // Add a new color field
  const addColorField = () => {
    setFormData((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, { name: "", images: null }],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);

    // Append colors and their images
    formData.colors.forEach((color, index) => {
      formDataToSend.append(`colors[${index}][name]`, color.name);
      if (color.images) {
        for (let i = 0; i < color.images.length; i++) {
          formDataToSend.append(`colors[${index}][images]`, color.images[i]);
        }
      }
    });

    try {
      const response = await axios.post("http://localhost:5000/api/products", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product added:", response.data);
      setSuccessPopup(true); // Show success popup

      // Hide success popup after 3 seconds
      setTimeout(() => {
        setSuccessPopup(false);
      }, 3000);
      setIsOpen(false); // Close form after submission
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

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
              <a href="/" className="sidebar-nav-link">
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
          <h2 className="header-title">Dashboard</h2>
          <button onClick={() => handleAddProductClick()} className="main-button">
            Add Product
          </button>
        </div>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-card">
            <h3 className="stat-title">Total Sales</h3>
            <p className="stat-value">$12,345</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Orders</h3>
            <p className="stat-value">245</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Customers</h3>
            <p className="stat-value">1,024</p>
          </div>
        </div>

        {/* Product List */}
        <div className="product-list">
          <h3 className="section-title">Recent Products</h3>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="product-table">
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Name</th>
                    <th className="table-cell">Price</th>
                    <th className="table-cell">Stock</th>
                    <th className="table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="table-row">
                      <td className="table-cell">{product.name}</td>
                      <td className="table-cell">${product.price}</td>
                      <td className="table-cell">{product.stock}</td>
                      <td className="table-cell">
                        <button className="table-button">Edit</button>
                        <button className="table-button delete-btn" onClick={() => deleteProduct(product._id)}>Delete</button>
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

export default AdminPage;

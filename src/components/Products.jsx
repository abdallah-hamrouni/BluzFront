import Header from './Header';
import Footer from './Footer';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Assure-toi d'importer Link
import { toast } from "react-toastify";
const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://bluz-backend.onrender.com/api/products");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }
    try {
      const response = await axios.post(
        "https://bluz-backend.onrender.com/api/carts/addToCart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    toast.success('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Check Our Products</h2>
                <span>Awesome & Creative collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <section className="section" id="products">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Our Latest Products</h2>
                <span>Check out all of our products.</span>
              </div>
            </div>
          </div>
  
          <div className="row">
            {items.length === 0 ? (
              <div>Loading...</div>
            ) : (
              items.map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item._id}>
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li>
                            <Link to={`/singleProduct/${item._id}`}>
                              <i className="fa fa-eye" />
                            </Link>
                          </li>
                          <li>
                            <Link onClick={() => addToCart(item._id, 1)}>
                              <i className="fa fa-shopping-cart" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <Link to={`/singleProduct/${item._id}`}>
                        <img
                          alt={item.name}
                          style={{
                            height: "480px",
                            width: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          className="mx-1"
                          src={item.colors?.[0]?.image || 'default.jpg'}
                        />
                      </Link>
                    </div>
                    <div className="down-content">
                      <h4>{item.name}</h4>
                      <span>${item.price}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
  
      <Footer />
    </>
  );
};

export default Products;

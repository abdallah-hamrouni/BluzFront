import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(0); // Track the selected color
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://bluz-backend.onrender.com/api/products/${id}`);
        setProduct(response.data);
        if (response.data.colors && response.data.colors.length > 0) {
          setMainImage(response.data.colors[0].images[0]);  // Set the first image of the first color as the default main image
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

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
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
    }
  };

  const getColorBackground = (colorName) => {
    const colorMap = {
      Black: "#000000",
      Pink: "#FFC0CB",
      Blue: "#0000FF",
      Red: "#FF0000",
      Green: "#008000",
      Yellow: "#FFFF00",
      orange: "#ff7f00",
      Brown: "#964B00"
    };
    return colorMap[colorName] || "#ccc"; // Default to gray if color is not in the map
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleColorChange = (index) => {
    setSelectedColor(index);
    setMainImage(product.colors[index].images[0]);  // Set the main image of the selected color
  };

  return (
    <div>
      <Header />
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>{product.name}</h2>
                <span>Awesome & Creative Layout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="product">
        <div className="container">
          <div className="row">
            {/* Left Section: Product Images */}
            <div className="col-lg-8">
              <div className="left-images" style={{ display: "flex", gap: "20px", alignItems: "center", cursor: "pointer", flexDirection: window.innerWidth < 768 ? "column" : "row" }}>
                {/* Main Image */}
                <img
                  src={mainImage} // Use the main image of the selected color
                  alt={product.name}
                  style={{ width: "450px", height: "600px", border: "1px solid #ccc" }}
                />

                {/* Additional Images for the selected color */}

                <div
                  className="related-images"
                  style={{
                    display: "flex",
                    flexDirection: window.innerWidth < 768 ? "row" : "column", // Ligne sur mobile, colonne sur desktop
                    flexWrap: window.innerWidth < 768 ? "wrap" : "nowrap", // Permet aux images de passer à la ligne sur mobile
                    gap: "10px",
                    cursor: "pointer",
                    transition: "border 0.3s ease",
                    justifyContent: "center"
                  }}
                >
                  {product.colors[selectedColor].images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Related to ${product.name}`}
                      onClick={() => setMainImage(image)}  // Change the main image on click
                      onMouseOver={(e) => (e.currentTarget.style.border = "2px solid #007BFF")}  // Add blue border on hover
                      onMouseOut={(e) => (e.currentTarget.style.border = "1px solid #ccc")}
                      style={{
                        width: "150px",
                        height: "150px",
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section: Product Details */}
            <div className="col-lg-4">
              <div className="right-content">
                <h4>{product.name}</h4>
                <span className="price">${product.price}</span>
                <p>{product.description}</p>
                <br />

                {/* Color Selection */}
                <div className="color-selection">
                  <h4>Available Colors:</h4>
                  <br />
                  <div style={{ display: "flex", gap: "10px" }}>
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        onClick={() => handleColorChange(index)}  // Change the main image based on the selected color
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: getColorBackground(color.name),  // Use the background color based on the name
                          cursor: "pointer",
                          border: "2px solid #ccc",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.border = "2px solid #007BFF")}  // Hover effect
                        onMouseOut={(e) => (e.currentTarget.style.border = "2px solid #ccc")}
                      >
                      </div>
                    ))}
                  </div>
                </div>

                <br />

                <div className="main-buttonn">
                  <Link onClick={() => addToCart(id, 1)}>Add to cart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SingleProduct; 
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    colors: [{ name: "", images: null }],
  });

  const navigate = useNavigate();

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

  const handleFileChange = (e, index) => {
    const files = e.target.files;
    const colors = [...formData.colors];
    colors[index].images = files;
    setFormData((prevState) => ({
      ...prevState,
      colors,
    }));
  };

  const addColorField = () => {
    setFormData((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, { name: "", images: null }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);

    formData.colors.forEach((color, index) => {
      formDataToSend.append(`colors[${index}][name]`, color.name);
      if (color.images) {
        for (let i = 0; i < color.images.length; i++) {
          formDataToSend.append(`colors[${index}][images]`, color.images[i]);
        }
      }
    });

    try {
      await axios.post("https://bluz-backend.onrender.com/api/products", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title">Add New Product</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
        required
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
        required
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
        required
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="form-input"
        />
        <textarea
            required
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
        />

        {formData.colors.map((color, index) => (
          <div key={index} className="color-block" style={{ marginRight: "10px" }}>
            <select
            required
              name="colors.name"
              value={color.name}
              onChange={(e) => handleInputChange(e, index)}
              className="form-select"
            >
              <option value="">Select Color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
            
            <input
            required
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, index)}
              className="form-file"
            />
          </div>
        ))}

        <button type="button" onClick={addColorField} className="btn-secondary">
          + Add Color
        </button>

        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>

      <style>{`
        .form-wrapper {
          max-width: 600px;
          margin: 40px auto;
          background: #fff;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .form-title {
          font-size: 28px;
          text-align: center;
          margin-bottom: 24px;
          color: #333;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-input,
        .form-textarea,
        .form-select,
        .form-file {
          padding: 12px 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          transition: border 0.3s;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: #007bff;
          outline: none;
        }

        .form-textarea {
          resize: vertical;
        }

        .color-block {
          background: #f9f9f9;
          padding: 16px;
          border-radius: 8px;
          border: 1px dashed #ccc;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .btn-secondary {
          background-color: #e0e0e0;
          color: #333;
          border: none;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-secondary:hover {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;

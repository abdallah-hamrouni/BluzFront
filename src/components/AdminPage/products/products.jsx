import React from "react";
import './products.css'; // Import the custom CSS

const ProductsPage = () => {
  return (
    <div className="products-container">
      <h2 className="page-title">Products</h2>

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
            <tr className="table-row">
              <td className="table-cell">T-shirt</td>
              <td className="table-cell">$25</td>
              <td className="table-cell">120</td>
              <td className="table-cell">
                <button className="table-button">Edit</button>
                <button className="table-button delete-btn">Delete</button>
              </td>
            </tr>
            {/* Add more rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;

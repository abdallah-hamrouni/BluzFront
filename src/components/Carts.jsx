import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token) {
        console.error("No token found, please login");
        return;
      }

      try {
        const response = await axios.get("https://bluz-backend.onrender.com/api/carts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.cart);
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [token]);
const deleteCartItem = async (itemId) => {
  if (!token) {
    console.error("No token found, please login");
    return;
  }
  try {     
    const response = await axios.delete(`https://bluz-backend.onrender.com/api/carts/${itemId}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Item deleted:", response.data);
    // Remove the deleted item from the cartItems state
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  } catch (error) { 
    console.error("Error deleting cart item:", error);
  }
};



  useEffect(() => {
    // Recalculate total price whenever cartItems change
    const price = cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    setTotalPrice(price);
  }, [cartItems]);

  const handleOpenPopup = (item) => {
    setSelectedItem(item); // Mettre à jour l'état avec l'élément sélectionné
    setShowPopup(true); // Afficher le popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Fermer le popup
  };
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        product: selectedItem.productId.name,
        quantity: selectedItem.quantity,
        total: (selectedItem.productId.price * selectedItem.quantity).toFixed(
          2
        ),
      };

      // Envoi de la commande à l'API
      const response = await fetch("https://bluz-backend.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderSuccess(true); // Afficher le message de succès
        setTimeout(() => {
          setShowPopup(false); // Fermer le popup après un certain délai
          setOrderSuccess(false); // Réinitialiser le message de succès
        }, 3000);
      } else {
        // Gérer l'échec de la commande (par exemple, afficher un message d'erreur)
        alert("Erreur lors de la soumission de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande", error);
      alert("Erreur de serveur");
    }           
  };

  return (
    <>
      <Header />
      <div
        className="container shopping-cart-container px-3 my-5 clearfix"
        style={{ paddingTop: "130px" }}
      >
        <div className="card">
          <div className="card-header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0 ">
                <thead>
                  <tr>
                    <th
                      className="text-center py-3 px-4"
                      style={{ minWidth: 400 }}
                    >
                      Product Name &amp; Details
                    </th>
                    <th className="text-right py-3 px-4" style={{ width: 100 }}>
                      Price
                    </th>
                    <th
                      className="text-center py-3 px-4"
                      style={{ width: 120 }}
                    >
                      Quantity
                    </th>
                    <th className="text-right py-3 px-4" style={{ width: 100 }}>
                      Total   
                    </th>
                    
                    <th
                      className="text-center align-middle py-3 px-0"
                      style={{ width: 40 }}
                    >
                      <a
                        href="/"
                        className="shop-tooltip float-none text-light"
                      >
                        <i className="ino ion-md-trash" />
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4">
                          <div className="media align-items-center">
                            <img
                              src={item.productId.colors[0].images[0]}
                              className="d-block ui-w-40 ui-bordered mr-4"
                              alt={item.name}
                            />
                            <div className="media-body">
                              <a href="/" className="d-block text-dark">
                                {item.productId.name}
                              </a>
                              <small>
                                <span className="text-muted">
                                  Description :{" "}
                                </span>
                                <span>{item.productId.description}</span>
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          ${item.productId.price}
                        </td>
                        <td className="align-middle p-4">
                          <input
                            type="number"
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={() => {}}
                          />
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          ${(item.productId.price * item.quantity).toFixed(2)}
                        </td>
                        
                        <td className="text-center align-middle px-0 ">
                        <div className="test">
                          <button
                            className="main-button"
                            onClick={() => handleOpenPopup(item)} // Passer l'élément sélectionné
                          >
                            Confirmer  
                          </button>
                          <button  className="main-button" onClick={() => deleteCartItem(item._id)}>
                            Supprimer
                          </button>
                          </div>
                        </td>
                        
                       
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Votre panier est vide
                      </td>
                    </tr>
                  )}
                </tbody>
                {showPopup && selectedItem && (
                  <div className={`popup-overlay ${showPopup ? "show" : ""}`}>
                    <div className={`popup ${showPopup ? "show" : ""}`}>
                      <h3>Passer une commande</h3>
                      <form onSubmit={handleSubmitOrder}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Nom
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                            Numéro de téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Ex: 0123456789"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="product" className="form-label">
                            Produit
                          </label>
                          <input
                            type="text"
                            id="product"
                            name="product"
                            className="form-control"
                            value={selectedItem.productId.name} // Nom du produit sélectionné
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="quantity" className="form-label">
                            Quantité
                          </label>
                          <div className="quantity-input">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                if (selectedItem.quantity > 1) {
                                  setSelectedItem({
                                    ...selectedItem,
                                    quantity: selectedItem.quantity - 1,
                                  });
                                }
                              }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              id="quantity"
                              name="quantity"
                              className="form-control text-center"
                              value={selectedItem.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                setSelectedItem({
                                  ...selectedItem,
                                  quantity: selectedItem.quantity + 1,
                                });
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="total" className="form-label">
                            Total
                          </label>
                          <input
                            type="text"
                            id="total"
                            name="total"
                            className="form-control"
                            value={(
                              selectedItem.productId.price *
                              selectedItem.quantity
                            ).toFixed(2)} // Calcul du total
                            readOnly
                          />
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClosePopup}
                          >
                            Fermer
                          </button>
                          <button type="submit" className="main-button">
                            Passer la commande
                          </button>
                          
                        </div>
                     
                      </form>
                    </div>
                  </div>
                )}
                {orderSuccess && (
                  <div className="success-message">
                    <p>Commande passée avec succès !</p>
                  </div>
                )}
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="mt-4"></div>
              <div className="d-flex">
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">
                    Total price
                  </label>
                  <div className="text-large">
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-right">
              <button
                type="button"
                className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
              >
                Back to shopping
              </button>
              <button type="button" className="main-button">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>  
  );
};

export default Carts;
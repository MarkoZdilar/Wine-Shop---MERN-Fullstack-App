import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product, isAdmin, setProducts }) {
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`, {
        withCredentials: true,
      });
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Greška pri brisanju proizvoda:", error);
    }
  };

  const navigateToUpdatePage = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  return (
    <div className="product-card-container">
      <div className="product-card">
        <div className="product-left">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-middle">
          <div className="product-details">
            <Link to={`/product/${product._id}`}>
              <h2>{product.name}</h2>
              <br />
              <br />
            </Link>
            <p>
              <strong>Proizvođač:</strong> {product.producer.name}
            </p>
            <p>
              <strong>Tip:</strong> {product.type}
            </p>
            <p>
              <strong>Cijena:</strong> {product.price} €
            </p>
            <br />
            <br />
            <br />
          </div>
          {isAdmin && (
            <div className="product-card-actions">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteProduct(product._id);
                }}
                className="delete-button"
              >
                Obriši proizvod
              </button>
              <button
                onClick={() => navigateToUpdatePage(product._id)}
                className="update-button"
              >
                Ažuriraj
              </button>
            </div>
          )}
        </div>
        <div className="product-right">
          <img
            src={product.producer.logo}
            alt={product.producer.name}
            className="producer-logo-pc"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

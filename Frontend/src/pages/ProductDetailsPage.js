import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsPage.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri dohvaćanju detalja proizvoda:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
      <h1 className="product-details-heading">
        {product.name} - Detalji o proizvodu 🍷
      </h1>
      <div className="logo-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-details-logo"
        />
      </div>
      <div className="product-info">
        <div className="producer-info">
          <img
            src={product.producer?.logo}
            alt={product.producer?.name}
            className="producer-logo"
          />
          <p>
            <strong>Proizvođač:</strong> {product.producer?.name} 🎨
          </p>
        </div>
        <p>
          <strong>Tip:</strong> {product.type} 🥂
        </p>
        <p>
          <strong>Cijena:</strong> {product.price} 💶
        </p>
        <p>
          <strong>O vinu: 🍷</strong> {product.description}
        </p>
        <p>
          <strong>O vinariji: 🖼️</strong> {product.producer?.description}
        </p>
      </div>
      <div className="extra-content"></div>
    </div>
  );
}

export default ProductDetailsPage;

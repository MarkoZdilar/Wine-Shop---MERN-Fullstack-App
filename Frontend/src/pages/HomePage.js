import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        const sortedProducts = response.data.sort((a, b) => {
          if (a.producer.name < b.producer.name) return -1; //Ako je -1, a je prije b
          if (a.producer.name > b.producer.name) return 1;
          return 0;
        });
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Greška pri dohvaćanju proizvoda:", error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/auth/user-role",
          { withCredentials: true }
        );
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Greška pri dohvaćanju uloge korisnika:", error);
      }
    };

    fetchProducts();
    fetchUserRole();
  }, []);

  return (
    <>
      <div>
        <div className="welcome-header">🥂 Dobrodošli u WineZ shop! 🥂</div>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isAdmin={userRole === "Administrator"}
            setProducts={setProducts}
          />
        ))}
      </div>
      <div style={{ height: "100px" }}></div>
    </>
  );
}

export default HomePage;

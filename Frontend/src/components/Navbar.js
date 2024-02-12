import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/auth/user-role",
          { withCredentials: true }
        );
        setIsAuth(true);
        setIsAdmin(response.data.role === "Administrator");
      } catch (error) {
        setIsAuth(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsAuth(false);
      setIsAdmin(false);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">WineZ 🍇</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Početna</Link>
        <Link to="/producers">Proizvođači</Link>
        {isAuth && !isAdmin && (
          <button className="cart-button">Košarica</button>
        )}
        {isAuth && isAdmin && (
          <div className="dropdown">
            <button className="dropbtn">Admin alati ⚙️</button>
            <div className="dropdown-content">
              <Link to="/add-manufacturer">Dodaj proizvođača</Link>
              <Link to="/add-product">Dodaj proizvod</Link>
              <Link to="/manage-users">Upravljanje korisnicima</Link>
            </div>
          </div>
        )}
        {isAuth ? (
          <Link to="/login" onClick={handleLogout}>
            Odjava
          </Link>
        ) : (
          <>
            <Link to="/login">Prijava</Link>
            <Link to="/signup">Registracija</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

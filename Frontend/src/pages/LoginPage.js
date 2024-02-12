import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Odgovor sa servera:", response);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Greška pri prijavi:", error.response.data);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Prijava</h2>
        <div className="form-group">
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Lozinka:</label>
          <input
            type="password"
            id="login-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-button">
          Prijavi se
        </button>
        <div className="auth-change-action">
          Nemaš račun? <Link to="/signup">Registriraj se!</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

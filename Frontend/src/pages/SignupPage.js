import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        { username, email, password }
      );

      console.log("Odgovor sa servera:", response);
      navigate("/login");
    } catch (error) {
      console.error("Registracijska greška:", error.response.data);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Registracija</h2>
        <div className="form-group">
          <label htmlFor="signup-username">Korisničko ime:</label>
          <input
            type="text"
            id="signup-username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="signup-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Lozinka:</label>
          <input
            type="password"
            id="signup-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-button">
          Registriraj se
        </button>
        <div className="auth-change-action">
          Već imaš račun? <Link to="/login">Prijavi se!</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;

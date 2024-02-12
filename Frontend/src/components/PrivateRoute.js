import React, { useState, useEffect } from "react";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5001/api/auth/user-role", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!isAuthChecked) {
    return null; //dok nije autentikacija prosla
  }

  if (!isAuthenticated) {
    return <div>Nemate dovoljnu razinu prava za pristup ovoj stranici</div>;
  }

  return children; //Child mu je npr AddProduct.js
};

export default PrivateRoute;

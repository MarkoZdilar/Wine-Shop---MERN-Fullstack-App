import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProducersPage from "./pages/ProducersPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AddProducer from "./pages/AddProducer";
import AddProduct from "./pages/AddProduct";
import ManageUsersPage from "./pages/ManageUsersPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/add-manufacturer"
          element={
            <PrivateRoute>
              <AddProducer />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-product/:id"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <PrivateRoute>
              <ManageUsersPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

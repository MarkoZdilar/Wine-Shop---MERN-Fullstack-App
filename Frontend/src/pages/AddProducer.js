import React, { useState } from "react";
import axios from "axios";
import "../styles/FormStyles.css";

function AddProducer() {
  const [producerData, setProducerData] = useState({
    name: "",
    logo: "",
    foundingYear: "",
    country: "",
    description: "",
    owner: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/producers/add-producer",
        producerData
      );
      setMessage("Proizvođač uspješno dodan!");
      setProducerData({
        name: "",
        logo: "",
        foundingYear: "",
        country: "",
        description: "",
        owner: "",
      });
    } catch (error) {
      setMessage("Došlo je do greške pri dodavanju proizvođača.");
    }
  };

  const handleChange = (event) => {
    setProducerData({
      ...producerData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Dodaj proizvođača</h1>
          <div className="form-group">
            <label htmlFor="name">Naziv firme:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={producerData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo URL:</label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={producerData.logo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="foundingYear">Godina osnivanja:</label>
            <input
              type="number"
              id="foundingYear"
              name="foundingYear"
              value={producerData.foundingYear}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Država:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={producerData.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis:</label>
            <textarea
              id="description"
              name="description"
              value={producerData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="owner">Vlasnik:</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={producerData.owner}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="form-button">
            Dodaj proizvođača
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
      <div className="extra-content-producer"></div>
    </>
  );
}

export default AddProducer;

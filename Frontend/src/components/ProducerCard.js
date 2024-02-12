import React, { useState } from "react";
import "../styles/ProducerCard.css";
import axios from "axios";

function ProducerCard({ producer, isAdmin, setProducers }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async (producerId) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      // Obriši producera na backendu
      await axios.delete(`http://localhost:5001/api/producers/${producerId}`);

      // Ažuriraj stanje na frontendu ako je brisanje uspješno
      setProducers((prevProducers) =>
        prevProducers.filter((p) => p._id !== producerId)
      );

      setSuccessMessage("Proizvođač je uspješno izbrisan!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Proizvođač ne može biti obrisan jer nije u bazi!");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage(
          "Proizvođač ne može biti obrisan jer još ima proizvoda!"
        );
      } else {
        setErrorMessage(
          "Došlo je do neočekivane greške. Proizvođač nije obrisan."
        );
        console.error("Greška pri brisanju proizvođača:", error);
      }
    }
  };

  return (
    <div className="producer-card">
      <img src={producer.logo} alt={producer.name} className="producer-logo" />
      <div className="producer-details">
        <h2>{producer.name}</h2>
        <p>
          <strong>Država:</strong> {producer.country}
        </p>
        <p>
          <strong>Godina osnivanja:</strong> {producer.foundingYear}
        </p>
        <p>
          <strong>Vlasnik:</strong> {producer.owner}
        </p>
      </div>
      {isAdmin && (
        <>
          <button
            onClick={() => handleDelete(producer._id)}
            className="delete-producer-button"
          >
            Obriši proizvođača
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </>
      )}
    </div>
  );
}

export default ProducerCard;

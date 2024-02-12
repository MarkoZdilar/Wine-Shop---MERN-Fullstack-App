import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/FormStyles.css";

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    producer: "",
    alcoholPercentage: "",
    type: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [producers, setProducers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const buttonText = id ? "Ažuriraj proizvod" : "Dodaj proizvod";

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/producers");
        setProducers(response.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju proizvođača:", error);
      }
    };

    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/${id}`
        );
        setProductData({
          name: response.data.name,
          producer: response.data.producer._id,
          alcoholPercentage: response.data.alcoholPercentage,
          type: response.data.type,
          price: response.data.price,
          description: response.data.description,
          imageUrl: response.data.imageUrl,
        });
      } catch (error) {
        console.error("Greška pri dohvaćanju detalja proizvoda:", error);
      }
    };

    fetchProducers();
    if (id) fetchProductData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      id
        ? await axios.put(
            `http://localhost:5001/api/products/${id}`,
            productData
          )
        : await axios.post(
            "http://localhost:5001/api/products/add-product",
            productData
          );
      alert(id ? "Proizvod uspješno ažuriran!" : "Proizvod uspješno dodan!");
      navigate("/");

      setProductData({
        // Resetiraj formu
        name: "",
        producer: "",
        alcoholPercentage: "",
        type: "",
        price: "",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Greška pri slanju podataka na backend:", error);
      alert("Došlo je do greške pri obradi zahtjeva.");
    }
  };

  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h1>{id ? "Ažuriraj proizvod" : "Dodaj proizvod"}</h1>
            <label htmlFor="name">Naziv:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="producer">Proizvođač:</label>
            <select
              id="producer"
              name="producer"
              onChange={handleChange}
              value={productData.producer}
            >
              <option value="">Odaberite proizvođača</option>
              {producers.map((producer) => (
                <option key={producer._id} value={producer._id}>
                  {producer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="alcoholPercentage">Postotak alkohola:</label>
            <input
              type="number"
              id="alcoholPercentage"
              name="alcoholPercentage"
              value={productData.alcoholPercentage}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Vrsta:</label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={productData.type}
            >
              <option value="">Odaberite vrstu</option>
              <option value="Bijelo">Bijelo</option>
              <option value="Crno">Crno</option>
              <option value="Rose">Rose</option>
              <option value="Pjenušac">Pjenušac</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Cijena:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis:</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">URL slike:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="form-button">
            {buttonText}
          </button>
        </form>
      </div>
      <div className="extra-content-product"></div>
    </>
  );
}

export default AddProduct;

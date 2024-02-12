import React, { useEffect, useState } from "react";
import axios from "axios";
import ProducerCard from "../components/ProducerCard";
import "../styles/ProducersPage.css";

function ProducersPage() {
  const [producers, setProducers] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchProducersAndRole = async () => {
      try {
        const producersResponse = await axios.get(
          "http://localhost:5001/api/producers"
        );
        setProducers(producersResponse.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju proizvođača:", error);
      }

      try {
        const roleResponse = await axios.get(
          "http://localhost:5001/api/auth/user-role",
          { withCredentials: true }
        );
        setUserRole(roleResponse.data.role);
      } catch (error) {
        console.error("Greška pri dohvaćanju uloge korisnika:", error);
      }
    };

    fetchProducersAndRole();
  }, []);

  const isAdmin = userRole === "Administrator";

  return (
    <>
      <div className="producers-container">
        <div className="welcome-header-producers">🍷 Popis svih vinara 🍷</div>
        {producers.map((producer) => (
          <ProducerCard
            key={producer._id}
            producer={producer}
            isAdmin={isAdmin}
            setProducers={setProducers}
          />
        ))}
      </div>
      <div className="extra-content"></div>
    </>
  );
}

export default ProducersPage;

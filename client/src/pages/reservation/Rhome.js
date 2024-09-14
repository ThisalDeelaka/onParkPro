import React, { useEffect, useState } from "react";
import ReservationList from "./ReservationList";
import './Rhome.css'; // Import the CSS file

const Rhome = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      const response = await fetch("reservation");
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const json = await response.json();
      setReservations(json);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the ReservationList component with fetched reservations
  return (
    <div className="home">
      <div className="reservations">
        <ReservationList reservations={reservations} />
      </div>
    </div>
  );
};

export default Rhome;

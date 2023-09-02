import React, { useState, useEffect } from "react";
import { useFlightData } from "../../context/FlightDataContext";
import FlightResultCard from "../../components/FlightResultsCard";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";

function FlightDataPage() {
  const { flightData } = useFlightData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (flightData.status !== 200) {
    return (
      <div>
        <div className="nav"></div>
        No flight data available.
      </div>
    );
  }

  return (
    <div className="root">
      <div className="nav">
        <h3>{flightData.results[0].arrivalAirport.city}</h3>
        <p>{flightData.searchData.adult} adult,{flightData.results[0].cabinType}</p>
        <p>{flightData.searchData.date}</p>
      </div>
      {flightData.results.map((flight) => (
        <FlightResultCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}

export default FlightDataPage;

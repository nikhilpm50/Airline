import React from "react";
import "../FlightResultsCard/style.css";
import logo from "../../assets/flightlogo.png";
import { Link } from "react-router-dom";

const FlightResultCard = ({ flight }) => {
  function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div>
      <div className="flight-card">
        <div className="flight-logo">
          <img src="https://th.bing.com/th?id=OIP.TQGi9KJJPACbeelpX8dgsQHaHP&w=252&h=247&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
          <p>{flight.flight_name}</p>
        </div>
        <div className="flight-details">
          <div className="flight-info">
            <div className="departure">
              <h2>{formatTime(flight.departureAirport.time)}</h2>
              <p>{flight.departureAirport.code}</p>
            </div>
            <div className="duration">
              <p>{flight.duration.text}</p>
              <div className="duration-line">
                <div className="hr"></div>
                <img className="duration-logo" src={logo} />
              </div>
              <p style={{ color: "teal" }}>Direct</p>
            </div>
            <div className="arrival">
              <h2>{formatTime(flight.arrivalAirport.time)}</h2>
              <p>{flight.arrivalAirport.code}</p>
            </div>
          </div>
          <div className="price-div">
            <div className="divider"></div>
            <div className="flight-price">
              <h3>₹ {Math.floor(flight.totals.total)}</h3>
              <Link to='/booking'>
              <button>Select</button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResultCard;

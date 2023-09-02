import React, { useState } from "react";
import "./style.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useFlightData } from "../../context/FlightDataContext";

function BookingConfirmPage() {
  const [open, setOpen] = useState(false);
  const { flightData } = useFlightData();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className="root">
      <p className="title">Your Flight</p>
      <div className="booking-flight">
        <div className="head">
          <h2> {flightData.results[0].departureAirport.city} to {flightData.results[0].arrivalAirport.city} </h2>
          <p>{flightData.results[0].flight_name}</p>
        </div>
        <div className="flight-details">
          <div className="flight-info">
            <div className="departure">
              <h2>{formatTime(flightData.results[0].departureAirport.time)}</h2>
              <p>{flightData.results[0].departureAirport.code}</p>
            </div>
            <div className="duration">
              <p>{flightData.results[0].duration.text}</p>
              <div className="duration-line">
                <div className="hr"></div>
                <img className="duration-logo" src="" />
              </div>
              <p style={{ color: "teal" }}>Direct</p>
            </div>
            <div className="arrival">
              <h2>{formatTime(flightData.results[0].arrivalAirport.time)}</h2>
              <p>{flightData.results[0].arrivalAirport.code}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="price">
        Booking Total
        <div>
          <p>₹ {Math.floor(flightData.results[0].totals.total * flightData.searchData.adult)}</p>
          <button onClick={handleClickOpen}>Confirm Booking</button>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Booking Successful</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
            PNR J6E5BWJ 
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            
            Go to My bookings to view flight details and print ticket.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{background:'red',color:'white'}} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookingConfirmPage;

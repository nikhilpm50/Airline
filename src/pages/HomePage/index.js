import React from 'react'
import FlightSearchCard from '../../components/FlightSearchCard'
import airLogo from '../../assets/AirIndia.jpg'
import './style.css'

function HomePage() {
  return (
    <div>
        <div className='header'>
          <img className='logo' src={airLogo} />
          <h3>Book Flight Tickets</h3>
        </div>
        <FlightSearchCard />
    </div>
  )
}

export default HomePage
import { createContext, useContext, useState } from 'react';

const FlightDataContext = createContext();

export const FlightDataProvider = ({ children }) => {
  const [flightData, setFlightData] = useState([]);

  return (
    <FlightDataContext.Provider value={{ flightData, setFlightData }}>
      {children}
    </FlightDataContext.Provider>
  );
};

export const useFlightData = () => {
  return useContext(FlightDataContext);
};

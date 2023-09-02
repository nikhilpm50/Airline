import "./App.css";
import FlightDataPage from "./pages/FlightDataPage";
import HomePage from "./pages/HomePage";
import {Route,Routes, BrowserRouter as Router} from 'react-router-dom'
import { FlightDataProvider } from "./context/FlightDataContext";
import BookingConfirmPage from "./pages/BookingConfirmPage";

function App() {
  return (
    <Router>
      <FlightDataProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flights" element={<FlightDataPage />} />
            <Route path="/booking" element={<BookingConfirmPage />} />
          </Routes>
        </div>
      </FlightDataProvider>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import "../FlightSearchCard/style.css";
import { Box, Container, Grid, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import DatePicker from "../DatePicker/index";
import axios from "axios";
import Counter from "../Counter";
import { useFlightData, setFlightData } from '../../context/FlightDataContext';
import { Link } from "react-router-dom";

const FlightSearchCard = () => {
  const [value, setValue] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [valueFromChild, setValueFromChild] = useState("");
  const [type, setType] = useState();
  const { flightData, setFlightData } = useFlightData();

  const handleValueFromChild = (value) => {
    setValueFromChild(value);
  };

  const adutIncrement = () => {
    setAdultCount(adultCount + 1);
  };

  const adultDecrement = () => {
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
    }
  };

  const childIncrement = () => {
    setChildCount(childCount + 1);
  };

  const childDecrement = () => {
    if (childCount > 1) {
      setChildCount(childCount - 1);
    }
  };

  const infantIncrement = () => {
    setInfantCount(infantCount + 1);
  };

  const infantDecrement = () => {
    if (infantCount > 1) {
      setInfantCount(infantCount - 1);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchClick = async () => {
    const options = {
      method: "GET",
      url: "https://flight-fare-search.p.rapidapi.com/v2/flights/",
      params: {
        from: fromCountry,
        to: toCountry,
        date: valueFromChild,
        adult: adultCount,
        child: childCount,
        infant: infantCount,
        type: type,
        currency: "INR",
      },
      headers: {
        "X-RapidAPI-Key": "7c1733b9femsh265cefbc4b0260fp17c1b6jsn349424ac232e",
        "X-RapidAPI-Host": "flight-fare-search.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setFlightData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box>
        <Card sx={{ marginTop: "50px" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Search Flights" value="1" />
                  <Tab label="Manage Booking" value="2" />
                  <Tab label="Check-In" value="3" />
                  <Tab label="Flight Status" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="oneway"
                          checked={true}
                          control={<Radio />}
                          label="One Way"
                        />
                        <FormControlLabel
                          value="roundtrip"
                          control={<Radio />}
                          label="Round Trip"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="input-content">
                    <input
                      placeholder="From"
                      onChange={(e) => setFromCountry(e.target.value)}
                    />
                    <input
                      placeholder="To"
                      onChange={(e) => setToCountry(e.target.value)}
                    />
                    <DatePicker onValueChange={handleValueFromChild} />
                    <div className="custom-dropdown">
                      <div className="dropdown-header" onClick={toggleDropdown}>
                        <p style={{ fontSize: "12px" }}>Passengers</p>
                        <p>
                          Adult {adultCount}{" "}
                          {childCount > 0 ? `,Child ${childCount}` : ""}{" "}
                          {infantCount > 0 ? `,Infants ${infantCount}` : ""}
                        </p>
                      </div>
                      {isOpen && (
                        <div className="dropdown-options">
                          <div className="option">
                            Adults{" "}
                            <Counter
                              count={adultCount}
                              decrement={adultDecrement}
                              increment={adutIncrement}
                            />
                          </div>
                          <div className="option">
                            Children{" "}
                            <Counter
                              count={childCount}
                              decrement={childDecrement}
                              increment={childIncrement}
                            />
                          </div>
                          <div className="option">
                            Infants{" "}
                            <Counter
                              count={infantCount}
                              decrement={infantDecrement}
                              increment={infantIncrement}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <select onChange={(e) => setType(e.target.value)}>
                      <option value="economy">Economy</option>
                      <option value="premium economy">Premium Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First</option>
                    </select>
                  </div>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button size="small" sx={{ color: "red" }}>
                    + Add PromoCode
                  </Button>
                  <Link to='/flights'>
                  <Button
                    size="small"
                    sx={{
                      color: "white",
                      background: "red",
                      height: "46px",
                      width: "120px",
                    }}
                  onClick={()=>handleSearchClick()}
                  >
                    {" "}
                    Show Flights
                  </Button>
                  </Link>
                </CardActions>
              </TabPanel>
              <TabPanel value="2">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <TextField
                          id="outlined-basic"
                          // label="Booking Reference Number (PNR)"
                          placeholder="Booking Reference Number (PNR)"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          id="outlined-basic"
                          placeholder="Last Name*"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{
                        color: "white",
                        background: "red",
                        height: "46px",
                        width: "120px",
                      }}
                    >
                      {" "}
                      Submit
                    </Button>
                  </CardActions>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <TextField
                          id="outlined-basic"
                          placeholder="eg JFDE2V*"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          id="outlined-basic"
                          placeholder="Last Name*"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{
                        color: "white",
                        background: "red",
                        height: "46px",
                        width: "120px",
                      }}
                    >
                      Check In
                    </Button>
                  </CardActions>
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <TextField
                          id="outlined-basic"
                          placeholder="Flight Number*"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          id="outlined-basic"
                          placeholder="Date*"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{
                        color: "white",
                        background: "red",
                        height: "46px",
                        width: "120px",
                      }}
                    >
                      Show Flights
                    </Button>
                  </CardActions>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default FlightSearchCard;

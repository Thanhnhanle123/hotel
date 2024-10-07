import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import locationIcon from "../../assests/icons/location.png"; // Changed variable name to avoid conflict
import { Link } from "react-router-dom";
import {
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"; // Import necessary components

export default function List_Hotel() {
  const [hotels, setHotels] = useState([]);
  const [locations, setLocations] = useState([]); // Store locations as an array
  const [loading, setLoading] = useState(true); // State for loading
  const [filterText, setFilterText] = useState(""); // State for filter text
  const [selectedLocation, setSelectedLocation] = useState(""); // State for selected location
  const [ratingFilter, setRatingFilter] = useState(0); // State for rating filter

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "https://api-tltn.onrender.com/api/v1/hotel/list-all"
        );
        setHotels(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the hotels!", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://api-tltn.onrender.com/api/v1/location/list-all"
        );
        if (response.status === 200) {
          setLocations(response.data.data); // Set the data in state
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchHotels(), fetchLocations()]); // Fetch both data
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  // Function to get the location name by its ID
  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location ? location.name : "Unknown location"; // Return the name or fallback
  };

  // Filter hotels based on the filter text, selected location, and rating filter
  const filteredHotels = hotels.filter((hotel) => {
    const hotelName = hotel.hotel_name.toLowerCase();
    const hotelDescription = hotel.description.toLowerCase();
    const locationMatches = selectedLocation
      ? hotel.location === selectedLocation
      : true;
    const ratingMatches = hotel.rating >= ratingFilter; // Adjust rating matching

    return (
      (hotelName.includes(filterText.toLowerCase()) ||
        hotelDescription.includes(filterText.toLowerCase())) &&
      locationMatches &&
      ratingMatches
    );
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    ); // Show spinner while loading
  }

  return (
    <div className="page-hotel">
      <h2>Hot Booking</h2>
      <TextField
        variant="outlined"
        placeholder="Filter by hotel name or description"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)} // Update filter text on input change
        fullWidth
        style={{ marginBottom: "20px" }} // Add some spacing
      />

      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel id="location-select-label">Location</InputLabel>
        <Select
          labelId="location-select-label"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)} // Update selected location
          displayEmpty
        >
          <MenuItem value="">
            <em>All Locations</em>
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel id="rating-select-label">Minimum Rating</InputLabel>
        <Select
          labelId="rating-select-label"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)} // Update rating filter
          displayEmpty
        >
          <MenuItem value={0}>All Ratings</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
        </Select>
      </FormControl>

      {filteredHotels.map((hotel) => (
        <Link className="hotel-list-item" to="/hotel_detail" key={hotel.id}>
          <div className="list-hotel-item">
            <div className="flex-hotel">
              <img
                className="list-hotel-img"
                src={hotel.image_hotel || "https://via.placeholder.com/150"} // Fallback image
                alt={hotel.hotel_name}
              />
              <div className="list-hotel-contain">
                <h4>{hotel.hotel_name}</h4>
                <div className="location">
                  <img
                    className="icon"
                    src={locationIcon}
                    alt="Location Icon"
                  />
                  {/* Display the location name using the ID from hotel */}
                  <p>{getLocationName(hotel.location)}</p>
                </div>
                <Rating
                  name={`rating-${hotel.id}`}
                  value={parseFloat(hotel.rating)}
                  readOnly
                />
                <p className="list-hotel-desc">{hotel.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

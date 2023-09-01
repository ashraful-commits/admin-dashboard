import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationMapChart = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = { lat: 0, lng: 0 };

  return (
    <div className="h-full shadow-md rounded-xl">
      <h2 className="text-sm md:text-lg lg:text-xl font-semibold my-2">
        Location Distribution Map
      </h2>
      <div style={mapContainerStyle}>
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={1}
          >
            {data.map((location) => (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                label={location.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default LocationMapChart;

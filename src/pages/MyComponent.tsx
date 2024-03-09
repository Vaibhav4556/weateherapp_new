import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import "../styles/MyComponent.css";

interface CountryData {
  name: {
    common: string;
  };
  capital: string;
  population: number;
  latlng: number[];
  flags: {
    png: string;
  };
}

function MyComponent() {
  const [data, setData] = useState<CountryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let location = useLocation();
  let country = location.state.input;

  const navigate = useNavigate();

  const toggleWeather = () => {
    navigate("/weatherInfo", { state: { country } }); // Navigate to the WeatherInfo component
  };

  useEffect(() => {
    if (!country) {
      setIsLoaded(true);
    }

    axios
      .get<CountryData[]>(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => {
        setIsLoaded(true);
        setData(res?.data[0]);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError("Failed to fetch Country data.");
        console.log(error);
      });
  }, [country]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // let countryName = data?.name.common.toLowerCase();

  if (!isLoaded) {
    return (
      <div data-testid="loading-animation">
        <div className="container">
          <Player
            style={{ width: "200px", height: "100px" }}
            src="https://lottie.host/c3e8e1e3-bb15-4e0c-b4ea-7109ea84df5c/Y0iii0QbUO.json"
            className="player"
            loop
            autoplay
          />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="nodata">No data available for this country.</div>;
  }

  return (
    <div>
      <h4 className="infoheading">Country Info</h4>
      <div
        className="detailinfo"
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "2rem",
          maxWidth: "100%",
          flexWrap: "wrap",
        }}
      >
        <div
          className="maindiv"
          style={{ padding: "2rem", backgroundColor: "whitesmoke" }}
        >
          <div className="countryInfo">
            <p>
              {" "}
              Capital:
              <span data-testid="capital">{data.capital}</span>
            </p>
            <p>
              Population:
              <span data-testid="population">{data.population}</span>
            </p>
            <p>
              {" "}
              <span>Latitude:</span> {data.latlng[0]}
            </p>
            <p className="lonp">
              {" "}
              <span>Longitude:</span> {data.latlng[1]}
            </p>
            <img
              data-testid="flagurl"
              src={data.flags.png}
              alt={data.name.common}
              style={{ width: "100px" }}
            />
          </div>

          <div className="weatherInfo">
            <button onClick={toggleWeather}>Capital Weather</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import "../styles/WeatherInfo.css";

interface WeatherData {
  capital: string;
  condition: { icon: string };
  temp_c: number;
  wind_kph: number;
  precip_in: number;
}

function WeatherInfo() {
  const location = useLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const capital = location.state.country;

    if (!capital) {
      setLoading(false);
      return;
    }

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=f88da03c35f94df3a3e183319231602&q=${capital}&aqi=no`
      )
      .then((res) => {
        setWeatherData(res.data.current);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError("Failed to fetch weather data.");
        setLoading(false);
      });
  }, [location.state.country]);

  
  console.log("weatherData",weatherData);
  console.log("loading",loading);

  if (loading) {
    return (
      <div data-testid="loading-animation">
        <div className="container" >
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
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!weatherData) {
    return (
      <div className="noweatherdata">
        No Weather data available for this country.
      </div>
    );
  }

  // Render the data for the country here...

  return (
    <div>
      <div className="weathermaindiv" >
        <div className="weatherData">
          <p>
            Temperature:
            
            <span data-testid="temp">{weatherData.temp_c} Degree</span> 
          </p>
          <img src={weatherData.condition.icon} alt="icon" />
          <p>
            Wind Speed:
            <span data-testid="windspeed">{weatherData.wind_kph} Kph</span>
          </p>
          <p>
            Precipitation:
            <span data-testid="precipitation" >{weatherData.precip_in}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;




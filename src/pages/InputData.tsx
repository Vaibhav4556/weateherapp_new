import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/InputData.css";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
const InputData = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [liveData, setLiveData] = useState<any>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    navigate("/countryInfo", { state: { input } });
  };

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      axios
        .get(
          `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=81a512f9bfe94c0d8f1426fc508d8d0a`
        )
        .then((res: any) => {
          setLiveData(res?.data?.data[0]);
        })
        .catch((error: any) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#043c48" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            padding: "1rem",
          }}
        >
          <IoLocationSharp style={{ padding: "1rem", color: "red" }} />
          Current Location
        </h2>
        <div style={{ color: "white", fontWeight: "600" }}>
          <p style={{ color: "white", fontSize: "16px", fontWeight: "700" }}>
            {liveData?.datetime}{" "}
          </p>{" "}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3 style={{ color: "#F44955", fontSize: "2rem" }}>
            {liveData?.city_name}
          </h3>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            width: "500px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#c3ebea",
            flexDirection: "column",
          }}
        >
          <h3> Additional Info</h3>
          <p className="addinfo">Temperature : {liveData?.app_temp}</p>
          <p className="addinfo"> Pressure : {liveData?.pres} mb</p>
          <p className="addinfo">Precipitation :{liveData.precip} mm/hr</p>
          <p className="addinfo">Wind speed :{liveData.wind_spd} m/s</p>
        </div>
      </div>

      <div className="inputdata">
        <form className="formdata" onSubmit={handleSubmit}>
          <input
            className="input"
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Country Name"
          />
          <button type="submit" className="submit" disabled={input === ""}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputData;

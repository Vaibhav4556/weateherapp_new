
import InputData from "./pages/InputData";
import MyComponent from "./pages/MyComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WeatherInfo from "./pages/WeatheInfo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InputData />} />
          <Route path="/countryInfo" element={<MyComponent   />} />
          <Route path="/weatherInfo" element={<WeatherInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

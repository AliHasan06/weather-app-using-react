import "./App.css";
import { useState } from "react";

const api = {
  key: "abcb7ba1dd6171022e425bc87b0ce71b",
  base: "https://api.openweathermap.org/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  // Search button is pressed. Make a fetch call to the Open Weather Map API.
  const searchPressed = () => {
    if (!search) {
      setError("Please enter a city name.");
      return;
    }
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === "404") {
          setError("City not found. Please enter a valid city.");
          setWeather({});
        } else {
          setWeather(result);
          setError("");
        }
      })
      .catch((err) => {
        setError("Error fetching data. Please try again.");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER */}
        <h1>Weather App</h1>

        {/* Search Box - Input + Button */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location */}
            <p>{weather.name}</p>

            {/* Temperature Celsius */}
            <p>{weather.main.temp}°C</p>

            {/* Condition (Sunny) */}
            {weather.weather && weather.weather.length > 0 && (
              <>
                <p>{weather.weather[0].main}</p>
                <p>({weather.weather[0].description})</p>
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;

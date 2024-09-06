import "./App.css";
import { useState } from "react";

const api = {
  key: "abcb7ba1dd6171022e425bc87b0ce71b",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const searchPressed = () => {
    if (!search) {
      setError("Please enter a city name.");
      return;
    }
    fetch(`https://cors-anywhere.herokuapp.com/${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
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
        <h1>Weather App</h1>
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {typeof weather.main !== "undefined" ? (
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
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

import { useState, useEffect } from "react";
import "./App.css";
import WeatherInfo from "./components/WeatherInfo.jsx";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [bottomRange, setBottomRange] = useState(20);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      const response = await fetch(
        "https://api.weatherbit.io/v2.0/forecast/daily?lat=41.872&lon=-87.652&days=10&key=" +
          API_KEY
      );
      const json = await response.json();
      setList(json);
      setFilteredResults(json); // initialize filtered results to full list
      console.log(json);

      const newDescriptions = [
        ...new Set(json.data.map((item) => item.weather.description)),
      ];
      setDescriptions(newDescriptions); // unique values only
      console.log(newDescriptions);
    };
    fetchAllWeatherData().catch(console.error);
  }, []);

  const useFilters = () => {
    
    let currentData = list.data;

    // apply search filter
    if (searchInput !== "") {
      console.log("here!");
      currentData = currentData.filter((item) =>
        // combines all values in weatherInfo object into single string and searches that string for searchValue
        item.datetime.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // apply bottom range filter
    if (bottomRange > 20) {
      currentData = currentData.filter(
        (item) => (item.low_temp * 9) / 5 + 32 >= bottomRange
      );
    }
    console.log(currentData);
    setFilteredResults({ data:currentData });
  };

  return (
    <div className="whole-page">
      <h1>Weather in Chicago</h1>

      <input
        type="text"
        placeholder="Search..."
        // when user types in input box, it triggers searchItems function
        // inputString is the "evenet object" changing indicates change in input box
        // onChange={(inputString) => searchItems(inputString.target.value)}
        onChange={(inputString) => setSearchInput(inputString.target.value)}
      />

      <label>Above this Low Temp (20-60°F)</label>
      <input
        type="range"
        name="temp"
        min="20.0"
        max="60.0"
        step="2"
        value={bottomRange}
        onChange={(event) => setBottomRange(Number(event.target.value))}
      ></input>

      <button onClick={useFilters}>Submit</button>

      {(searchInput.length > 0) | (bottomRange > 20) ? (
        // what happens if we have search input? what list do we use to display coins?
        <ul>
          {filteredResults.data.map((weatherData) => (
            <WeatherInfo
              key={weatherData.datetime}
              datetime={weatherData.datetime}
              low_temp={weatherData.low_temp}
              high_temp={weatherData.high_temp}
              weatherDescription={weatherData.weather.description}
            />
          ))}
        </ul>
      ) : (
        <ul>
          {list?.data.map((weatherData) => (
            <WeatherInfo
              key={weatherData.datetime}
              datetime={weatherData.datetime}
              low_temp={weatherData.low_temp}
              high_temp={weatherData.high_temp}
              weatherDescription={weatherData.weather.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import WeatherInfo from "./components/WeatherInfo.jsx";
import Chart from "./components/Chart.jsx"; 
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState({data:[]});
  const [searchInput, setSearchInput] = useState("");
  const [bottomRange, setBottomRange] = useState(20);
  const [lowTemps, setLowTemps] = useState([]);
  const [highTemps, setHighTemps] = useState([]);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      const response = await fetch(
        "https://api.weatherbit.io/v2.0/forecast/daily?lat=41.872&lon=-87.652&days=10&key=" +
          API_KEY
      );
      const json = await response.json();
      console.log(json.data);
      setList(json);
      setFilteredResults(json); // initialize filtered results to full list

      if (json) {
        const lows = json.data.map((item) => (item.low_temp*9/5+32));
        setLowTemps(lows);
        const highs = json.data.map((item) => (item.high_temp*9/5+32));
        setHighTemps(highs);
      }

    };
    fetchAllWeatherData().catch(console.error);
  }, []);

  useEffect (() => {
    if (!list) return; // needed to avoid race condition -- this useEffect running 
    // before list is set from the API returns a response
    let currentData = list.data;

    // apply search filter
    if (searchInput !== "") {
      currentData = currentData.filter((item) =>
        item.datetime.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // apply bottom range filter
    if (bottomRange > 20) {
      currentData = currentData.filter(
        (item) => (item.low_temp * 9) / 5 + 32 >= bottomRange
      );
    }
    setFilteredResults({ data:currentData });
  }, [bottomRange, searchInput]);

  const calculateMean = (temps) => {
    let sum = 0;
    temps.forEach(element => {
      sum += Number(element);
    });
    return (sum/temps.length).toFixed(2);
  };

  const calculateMaxTemp = (temps) =>{
    let max = 0;
    temps.forEach(element =>{
      if(element > max){
        max = element;
      }
    })
    return max.toFixed(2);
  }

  return (
    <div className="whole-page">
      <h1>Weather in Chicago</h1>
      <p>Mean Low Temp: {calculateMean(lowTemps)}</p>
      <p>Mean High Temp: {calculateMean(highTemps)}</p>
      <p>Max High Temp: {calculateMaxTemp(highTemps)}</p>

      <input
        type="text"
        placeholder="Search..."
        // when user types in input box, it triggers searchItems function
        // inputString is the "evenet object" changing indicates change in input box
        onChange={(inputString) => setSearchInput(inputString.target.value)}
      />
      <br></br>
      <br></br>
      <label>Above this Low Temp (20-60°F)</label>
      <span className = 'tab'></span>
      <input
        type="range"
        name="temp"
        min="20.0"
        max="60.0"
        step="2"
        value={bottomRange}
        onChange={(event) => setBottomRange(Number(event.target.value))}
      ></input>

      {(searchInput.length > 0) || (bottomRange > 20) ? (
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
      
      {list ? (
        <div className="charts-section">
        <Chart data ={list.data} metric ="rh" title="Humidity %"/>
        <Chart data = {list.data} metric="uv" title="UV"/>
        </div>) : (
        <p>loading charts...</p>
      )}

    </div>
  );
}

export default App;

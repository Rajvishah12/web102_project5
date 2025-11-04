import { useEffect, useState } from "react"
import { useParams } from "react-router"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function WeatherDetail() {
    // grabs data from the param URL
    const { date } = useParams()
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {

        // fetch weather data
        const fetchWeatherDetail = async () => {
            const response = await fetch(
                `https://api.weatherbit.io/v2.0/forecast/daily?lat=41.872&lon=-87.652&days=10&key=${API_KEY}`
            )
            const json = await response.json()
            // select data for the specific date in question
            // searches through json data and selects the item where the datetime matches the date parameter
            const dayData = json.data.find(item => item.datetime === date)
            setWeatherData(dayData)
        }
        fetchWeatherDetail().catch(console.error)
        // re-render when the date parameter changes
    }, [date])

    return (
        <div>
            {weatherData ? (
                <div>
                    <h2>Weather Details for {weatherData.datetime}</h2>
                    <p>High Temp: {(weatherData.high_temp * 9/5 + 32).toFixed(1)}°F</p>
                    <p>Low Temp: {(weatherData.low_temp * 9/5 + 32).toFixed(1)}°F</p>
                    <p>Description: {weatherData.weather.description}</p>
                    <p>Humidity: {weatherData.rh}%</p>
                    <p>Wind Speed: {weatherData.wind_spd} m/s</p>
                    <p>Precipitation: {weatherData.precip} mm</p>
                </div>
            ) : (
                // return nothing if data not fetched
                null
            )}
        </div>
    )
}

export default WeatherDetail;
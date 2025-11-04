import { useEffect, useState } from "react"
import { Link } from "react-router"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function WeatherInfo({datetime, high_temp, low_temp, weatherDescription}) {
    
    return (
        <div>
            {datetime ? ( // rendering only if API call actually returned us data
            <li className = 'main-list' key={datetime}>
                <Link to={`weatherDetails/${datetime}`}>
                {datetime}
                </Link>
                <span className = 'tab'></span>
                {(low_temp*9/5+32).toFixed(1)}°F - {(high_temp*9/5+32).toFixed(1)}°F
                <span className = 'tab'></span>
                {weatherDescription}
            </li>
            ) : null }
        </div>
        )
}

export default WeatherInfo;
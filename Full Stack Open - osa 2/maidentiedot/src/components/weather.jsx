import axios from "axios"
import { useEffect, useState } from "react"
const api_key = process.env.REACT_APP_API_KEY

const Weather = (props) => {
    
    const [weather, setWeather] = useState()

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${props.data.capitalInfo.latlng[0]}&lon=${props.data.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`).then(response => {
            setWeather(
                <div>
                    <h3>Capital weather</h3>
                    <div>Temperature: {response.data.current.temp} celsius</div>
                    <div>Wind speed: {response.data.current.wind_speed} m/s</div>
                    <img src={`http://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`} alt="Weather icon"/>
                </div>
            )
        })
    }, [props])
    return(weather)
}

export default Weather
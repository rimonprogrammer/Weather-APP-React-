import React from 'react';
import '../assets/css/Home.css';
import sun_rise from '../assets/img/sun rise.png';
import humidityImg from '../assets/img/humidity.png';
import pressureImg from '../assets/img/storm.png';
import windImg from '../assets/img/wind.png';
import { useState } from 'react';
import { useEffect } from 'react';

function Home() {
    const [searchValue, setSearchValue] = useState("Kushtia");
    const [tempInfo, setTempInfo] = useState({});
    const [weatherMood, setWeatherMood] = useState('wi-day-sunny')
 
    const weather_info = async () =>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=30f597b8e7d14c619bc04c068898113f`;

            const res = await fetch(url);
            const data = await res.json()

            const {temp, humidity, pressure} = data.main;
            const {main} = data.weather[0];
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
            const {name} = data;

            const weatherData = {
                temp, 
                humidity,
                pressure,
                main,
                speed,
                country,
                sunset,
                name
            };
            setTempInfo(weatherData);

        } catch (error) {
            alert(error);
        }
    };

    useEffect(()=>{
        weather_info();
    }, []);
    

    const { temp, humidity, pressure, main, speed, country, sunset, name} =tempInfo;

    useEffect(()=>{
        if(main){
            switch(main){
                case "Clouds":
                    setWeatherMood("wi-day-cloudy");
                    break;

                case "Haze":
                    setWeatherMood("wi-day-haze");
                    break;

                case "Clear":
                    setWeatherMood("wi-day-sunny");
                    break;

                case "Mist":
                    setWeatherMood("wi-fog");
                    break;

                default:
                    setWeatherMood("wi-day-sunny");
            }
        }
    }, [main]);

    let sec = sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className='container'>
        <div className="weather_App">
            <div className='search_aria'>
                <input onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} type="text" autoFocus id='search' placeholder='Enter your city name' />
                <button onClick={weather_info}>Search<i className="fa-solid fa-magnifying-glass-location"></i></button>
            </div>
            <div className="weather_image">
                <i className={`wi ${weatherMood}`}></i>
            </div>
            <div className="weather_text">
                <div className="row first_row">
                    <div className="col-md-7 d-flex clouds">
                        <h1>{temp}°</h1>
                        <div className='ps-3 '>
                            <h4>{main}</h4>
                            <p>{name}, {country}</p>
                        </div>
                    </div>
                    <div className="col-md-5 time">
                        <p>{new Date().toLocaleDateString()}</p>
                        <p>{new Date().toLocaleTimeString()}</p>
                    </div>
                </div>
                <div className='row last_row'>
                    <div className="col-3">
                        <img src={sun_rise} alt="" />
                        <div className='ps-2'>
                            <p>{timeStr}</p>
                            <p>Sunset</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <img src={humidityImg} alt="" />
                        <div className='ps-2'>
                            <p>{humidity}</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <img src={pressureImg} alt="" />
                        <div className='ps-2'>
                            <p>Pressure</p>
                            <p>{pressure} MM</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <img src={windImg} alt="" />
                        <div className='ps-2'>
                            <p>Wind</p>
                            <p>{speed}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
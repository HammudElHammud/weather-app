import React, {useState, useEffect} from 'react'
import './lastCard.css'
import {
    getFormattedDate,
    toCamelCase,
    toFerenheit,
} from "../../utils/Helpars/WeatherHelper";

const LastSearchedCard = (props) => {
    const [today, setToday] = useState(props?.data?.list[0])
    const [unitIsCelcius, setUnitIsCelcius] = useState(true)

    useEffect(()=>{
        setToday(props?.data?.list[0])

    }, [props.data])

    var weatherIconsMap = {
        "01d": "wi-day-sunny",
        "01n": "wi-night-clear",
        "02d": "wi-day-cloudy",
        "02n": "wi-night-cloudy",
        "03d": "wi-cloud",
        "03n": "wi-cloud",
        "04d": "wi-cloudy",
        "04n": "wi-cloudy",
        "09d": "wi-showers",
        "09n": "wi-showers",
        "10d": "wi-day-hail",
        "10n": "wi-night-hail",
        "11d": "wi-thunderstorm",
        "11n": "wi-thunderstorm",
        "13d": "wi-snow",
        "13n": "wi-snow",
        "50d": "wi-fog",
        "50n": "wi-fog"
    };

    return(
        <>
            <div className="col-12 col-lg-12" id="wrapper">
                <div className="container-fluid" id="current-weather">
                    <div className="row">
                        <div className="col-md-4 col-sm-5">
                            <h5>
                                <spam>{props?.city}</spam>
                                , <spam>{props?.country}</spam>
                            </h5>
                            <h6 >{getFormattedDate(today?.dt)}</h6>
                            <h5 >{new Date().toLocaleTimeString()} </h5>
                        </div>
                        <div
                            className="col-md-5 col-sm-7"
                            style={{margin: "10px auto", padding: 0}}
                        >
                            <div className="row mainTemperatureCenter">
                                <i className={"wi " + (weatherIconsMap[today?.weather[0].icon])} style={{fontSize: 65}}/>
                                <div style={{
                                    marginTop: '20px'
                                }}>
                                    <spam id="mainTemperature">{unitIsCelcius ? Math.round(today?.temp?.day) :   toFerenheit(Math.round(today?.temp?.day))  }</spam>
                                    <p id="tempDescription">{today?.weather[0]?.description.length > 0 ? toCamelCase(today?.weather[0]?.description) : ''}</p>
                                </div>
                                <p style={{fontSize: "1.5rem"}}>
                                    <a href='#'
                                       className={"cursor " + (unitIsCelcius ? ' active' : '') }
                                       onClick={(e)=>{
                                           e.preventDefault()
                                           setUnitIsCelcius(true)}}
                                       id="celcius">
                                        °C
                                    </a>{" "}
                                    |{" "}
                                    <a
                                        href='#'
                                        className={"cursor " + (!unitIsCelcius ? ' active' : '') }
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            setUnitIsCelcius(false)
                                        }
                                        }
                                        id="farenheit">
                                        °F
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div
                            className="col-xs-12 col-sm-12 col-md-3 row"
                            style={{textAlign: "right"}}
                        >
                            <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                                <h6>
                                    Humidity: <spam >{today?.humidity}%</spam>
                                </h6>
                            </div>
                            <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                                <h6>
                                    Wind: <spam>{today?.speed} m/s</spam>
                                </h6>
                            </div>
                            <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                                <h6>
                                    High: <spam>{(Math.round(today?.temp?.max))} °</spam>
                                </h6>
                            </div>
                            <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                                <h6>
                                    Low: <spam>{Math.round(Math.round(today?.temp?.min))}°</spam>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row lasts-days">
                        {
                            props?.data?.list.slice(1, 5).map((li)=>{
                                return (
                                    <div className="col-md-3 col-sm-6 day-weather-box" key={li?.speed}>
                                        <div className="col-sm-12 day-weather-inner-box">
                                            <div className="col-sm-8 forecast-main">
                                                <p >{getFormattedDate(li?.dt).substring(0,3)}</p>
                                                <div className="row">
                                                    <h5 id="forecast-day-1-main">{(Math.round(li?.temp?.day))} °</h5>
                                                    <i className={"wi forecast-icon " + (weatherIconsMap[li?.weather[0].icon]) } id="forecast-day-1-icon" style={{
                                                        maxWidth: '10px'
                                                    }}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 forecast-min-low">
                                                <p>
                                                    <spam classname="high-temperature"> {li?.temp?.max}</spam>
                                                </p>
                                                <p>
                                                    <spam classname="low-temperature">{li?.temp?.min} </spam>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default LastSearchedCard
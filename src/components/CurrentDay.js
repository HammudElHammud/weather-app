import React, {useState, useEffect} from "react";
import umberella from '../images/icon-umberella.png'
import wind from '../images/icon-wind.png'
import {getFormattedDate, toCamelCase, toFerenheit, weatherIconsMap} from "../utils/Helpars/WeatherHelper";

const CurrentDay = (props) => {
    const [today, setToday] = useState(null)
    const [unitIsCelcius, setUnitIsCelcius] = useState(true)

    useEffect(() => {
        setToday(props?.currentDay?.list[0])

    }, [props.currentDay])

    return (
        <>
            <div className="forecast-table">
                <div className="container">
                    <div className="forecast-container">
                        <div className="today forecast">
                            <div className="forecast-header">
                                <div className="day">{today?.dt ? getFormattedDate(today?.dt) : ''}</div>
                            </div>
                            {" "}
                            <div className="forecast-content">
                                <div className="location">{props?.city}</div>
                                <div className="degree">
                                    <div className="num">
                                       {unitIsCelcius ? Math.round(today?.temp?.day ? today?.temp?.day : '') : toFerenheit(Math.round(today?.temp?.day))}
                                        <sup>o</sup>C
                                    </div>
                                    <div className="forecast-icon">
                                        <i className={"wi " + (weatherIconsMap[today?.weather[0].icon])}
                                           style={{
                                               fontSize: 50,
                                        }}/>
                                        <p id="tempDescription" style={{
                                            marginTop: '20px'
                                        }}>{today?.weather[0]?.description.length > 0 ? toCamelCase(today?.weather[0]?.description) : ''}</p>

                                    </div>
                                    <p style={{fontSize: "1.5rem"}}>
                                        <a
                                            className={"cursor " + (unitIsCelcius ? ' active' : '') }
                                            onClick={()=> setUnitIsCelcius(true)}
                                            id="celcius">
                                            °C
                                        </a>{" "}
                                        |{" "}
                                        <a
                                            className={"cursor " + (!unitIsCelcius ? ' active' : '') }
                                            onClick={()=> setUnitIsCelcius(false)}
                                            id="farenheit">
                                            °F
                                        </a>
                                    </p>
                                </div>
                                <span>
                                    <img src={umberella} alt=""/>
                                    {today?.humidity}%
                                          </span>
                                <span>  <img src={wind} alt=""/>{today?.speed} m/s </span>
                            </div>
                        </div>
                        {
                            props?.currentDay?.list.slice(1, 7).map((li) => {
                                return (
                                    <div className="forecast" key={li}>
                                        <div className="forecast-header">
                                            <div className="day">{getFormattedDate(li?.dt).substring(0, 3)}</div>
                                        </div>
                                        {" "}
                                        <div className="forecast-content">
                                            <div className="forecast-icon">
                                                <i className={"forecast-icon-wi wi  " + (weatherIconsMap[li?.weather[0].icon]) }/>
                                            </div>
                                            <div className="degree">
                                                {(Math.round(li?.temp?.day))}<sup>o</sup>C
                                            </div>
                                            <small>
                                                {(Math.round(li?.temp?.max))}<sup>o</sup>
                                            </small>
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

export default CurrentDay
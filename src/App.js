import React, {useState, useEffect} from 'react'
import './App.css';
import banner from './images/summer.jpeg'
import brokenclouds from './images/brokenclouds.jpeg'
import OvercastClouds from './images/OvercastClouds.jpeg'
import LightRain from './images/LightRain.jpeg'
import clearsky from './images/clearsky.jpeg'
import fewClouds from './images/fewClouds.jpeg'
import snow from './images/snow.jpeg'
import thunderstorm from './images/thunderstorm.jpeg'
import LastSearchedCard from "./components/Last/LastSearchedCard";
import Search from "./components/Search";
import Header from "./components/Header";
import CurrentDay from "./components/CurrentDay";
import {createAxios} from "./utils/Helpars/AxiosHelpers";
import * as Swal from './utils/Helpars/SwalHelper'
import {toCamelCase} from "./utils/Helpars/WeatherHelper";


const api = createAxios()

function App() {
    const [currentDay, setCurrentDay] = useState(null)
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [backgroundImage, setBackgroundImage] = useState(banner)


    useEffect(() => {
        gettingUserLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // eslint-disable-next-line
    }, [])

    const gettingUserLocation = () => {
        Swal.loading()
        api.get('https://ipapi.co/json/')
            .then((position) => {
                setCity(position?.data?.city)
                setCountry(position?.data?.country)
                gettingLocationWeather(position?.data?.city)
                Swal.close()
            }).catch((err) => {
            Swal.error('Oops', "Getting error while retrieving location")

        })

    }

    const setBackgroundImg = (value) => {

        if (value.toUpperCase() === 'Overcast Clouds'.toUpperCase())
            setBackgroundImage(OvercastClouds)
        if (value.toUpperCase() === 'Light Rain'.toUpperCase())
            setBackgroundImage(LightRain)
        if (value.toUpperCase() === 'clear sky'.toUpperCase())
            setBackgroundImage(clearsky)
        if (value.toUpperCase() === 'few clouds'.toUpperCase())
            setBackgroundImage(fewClouds)
        if (value.toUpperCase() === 'thunderstorm'.toUpperCase())
            setBackgroundImage(thunderstorm)
        if (value.toUpperCase() === 'Broken Clouds'.toUpperCase())
            setBackgroundImage(brokenclouds)
        if (value.toUpperCase() === 'snow'.toUpperCase())
            setBackgroundImage(snow)
    }


    const gettingLocationWeather = (value) => {
        Swal.loading()
        const city = value === undefined ? ' ' : value
        api.get(process.env.REACT_APP_API_URL +
            '/forecast/daily?units=metric&cnt=7&appid=' +
            process.env.REACT_APP_API_KEY + '&q=' + city)
            .then((responses) => {
                const dataForecast = responses?.data
                setBackgroundImg(toCamelCase(dataForecast?.list[0]?.weather[0]?.description))
                setCity(dataForecast?.city?.name)
                setCountry(dataForecast?.city?.country)
                setCurrentDay(null)
                localStorage.setItem('lastSearch', JSON.stringify(dataForecast))
                setCurrentDay(dataForecast)
                setTimeout(() => {
                    Swal.close()
                }, 200)
            })
            .catch((e) => {
                Swal.error('', e?.response?.data?.message
                    ? e?.response?.data?.message
                    : 'Getting error while retrieving weather'
                )
            })
    }

    return (
        <>
            <div className="site-content">
                <Header/>
                <div className="hero" style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})`,
                }}>
                    <Search
                        onClickToSearch={gettingLocationWeather}
                    />
                </div>
                <CurrentDay
                    currentDay={currentDay}
                    city={city}
                    country={country}
                />
                <main className="main-content">
                    <div className="fullwidth-block">
                        <div className="container">
                            <h2 className="section-title">Last Searched</h2>
                            <LastSearchedCard
                                city={JSON.parse(localStorage.getItem('lastSearch'))?.city?.name}
                                country={JSON.parse(localStorage.getItem('lastSearch'))?.city?.name}
                                data={JSON.parse(localStorage.getItem('lastSearch'))}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>

    );
}

export default App;

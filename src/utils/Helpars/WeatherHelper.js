export function toCamelCase(str) {
    var arr = str.split(" ").map(
        function(sentence){
            return sentence?.charAt(0).toUpperCase() + sentence.substring(1);
        }
    );
    return arr.join(" ");
}

export function getFormattedDate(date){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString("en-US",options);
}

export var weatherIconsMap = {
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

export function toCelcius(val){
    return Math.round((val - 32) * (5/9));
}

export function toFerenheit(val){
    var degrees = (val * 1.8) + 32;
    return Math.round(degrees);
}

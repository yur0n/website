import fetch from 'node-fetch';

export default (lat, long) => {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_APPID}&units=metric`)
           .then(res => res.json())
           .then(res => {
            if (res.cod) return 'Unable to find location'
            return  {
		main: res.current.weather[0].main,
		icon: res.current.weather[0].icon,
		temp: res.current.temp,
                today : `Right now it's ${res.current.weather[0].description}. The temperature is ${Math.round(res.current.temp)} degrees. Feels like ${Math.round(res.current.feels_like)} degrees.`,
                tomorrow : 'Tomorrow it will be ' + res.daily[1].weather[0].description + ', with the temperature ' + Math.round(res.daily[1].temp.day) + ' degrees.'
            }
           })
           .catch(() => 'Unable to connect to openweathermap')
}
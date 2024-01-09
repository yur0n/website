import fetch from 'node-fetch';

export default (address) => {
   return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=1&appid=${process.env.WEATHER_APPID}`)
   .then(res => res.json())
   .then(res => { 
      if (!res.length) return 'Unable to find location'
      return {
         latitude: res[0].lat,
         longitude: res[0].lon,
         location: res[0].name
      }})
   .catch(() => 'Unable to connect to location services')
}
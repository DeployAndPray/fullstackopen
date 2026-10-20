import axios from "axios"

const api_key = import.meta.env.VITE_OPENWEATHER_KEY
const base_url = 'https://api.openweathermap.org'

const getCurrentWeatherByCords = (lat, lng) => {
  const url = new URL(base_url)
  url.pathname = 'data/2.5/weather'
  url.searchParams.append('lat', lat)
  url.searchParams.append('lon', lng)
  url.searchParams.append('units', 'metric')
  url.searchParams.append('appid', api_key)

  return axios.get(url.toString()).then((resp) => resp.data)
}

const getIcon = (icon) => {
  return `https://openweathermap.org/payload/api/media/file/${icon}.png`
}

export default {
  getCurrentWeatherByCords,
  getIcon
}
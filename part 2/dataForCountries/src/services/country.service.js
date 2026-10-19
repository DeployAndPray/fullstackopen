import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'


const getAllCountries = () =>{
  return axios.get(`${baseUrl}/all`)
  .then(resp => resp.data)
}

const getCountryByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`)
  .then(resp => resp.data)
}


export default {
  getAllCountries,
  getCountryByName
}
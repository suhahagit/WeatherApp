const express = require('express')
const router = express.Router()
const urllib = require('urllib')
const kelvinToCelsius = require('kelvin-to-celsius')
const City = require('../models/City')

router.get('/sanity', (req, res) => {
  res.send('All good!')
})

//return specific city data
router.get('/city/:cityName', (req, res) => {
  urllib.request(`api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=484da5e921c1d538aee222ffd65ca2da`, (err, data, response) => {
    if (err) {
      console.log('API request error')
      throw err;
    }
    const weatherData = JSON.parse(data)
    const weather = {
      name: weatherData.name,
      temperature: kelvinToCelsius(weatherData.main.temp),
      condition: weatherData.weather[0].description,
      conditionPic: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      isSaved: false
    }
    res.send(weather)
  })
})

//get all city-data from db
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find({})
    res.send(cities)
  } catch (error) {
    res.send(error)
  }
})

//save new city to db
router.post('/city', async function(req, res){
  try {
    const city = new City({...req.body, isSaved: true}) 
    const saved = await city.save()
    res.send(saved)
  } catch (error) {
    res.send(error)
  }
})

//delete city from db
router.delete('/city/:cityName', async (req, res) => {
  const name = req.params.cityName
  try {
    const city = await City.remove({name})
    res.send(city)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
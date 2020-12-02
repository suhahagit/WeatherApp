const express = require('express')
const router = express.Router()
const City = require('../models/City')

router.get('/sanity', (req, res) => {
  res.send('All good!')
})



module.exports = router
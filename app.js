require("dotenv").config()
const express = require('express'),
      routes = require('./routes'),
      bodyParser = require('body-parser'),
      logger = require('morgan')
      cors = require('cors')

const app = express()

app.use( cors({ credentials: true, origin: true }) )
app.options('*', cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', routes)

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app

require("dotenv").config()
const express = require('express'),
      routes = require('./routes'),
      bodyParser = require('body-parser'),
      logger = require('morgan')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', routes)

module.exports = app
